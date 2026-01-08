import {c as V, j as e, r as x, I as oe} from "./InteractionButton-e0ac505e.js";
import "./settings.js";
const re = ({originalText: t, isPostPage: i}) => {
    const [m,n] = x.useState("")
      , [s,r] = x.useState(!1)
      , [b,T] = x.useState("")
      , [w,E] = x.useState("")
      , [O,R] = x.useState(!1)
      , [j,D] = x.useState(!1)
      , [k,S] = x.useState(!1)
      , [C,ee] = x.useState({
        x: window.innerWidth - 100,
        y: window.innerHeight / 2 - 20
    })
      , [v,U] = x.useState(!1)
      , y = x.useRef();
    x.useEffect( () => {
        const c = async () => {
            var d;
            if (!t)
                return;
            if (t.includes("标题：") && !t.includes("正文：") || ((d = t.split("正文：")[1]) == null ? void 0 : d.trim()) === "") {
                let a = 0;
                const h = 10
                  , g = 200
                  , f = () => {
                    const {title: p, content: u} = _();
                    if (u) {
                        const N = `标题：${p.trim()}
正文：${u.trim()}`;
                        l(N)
                    } else
                        a < h ? (a++,
                        console.log(`Waiting for content... Retry ${a}/${h}`),
                        setTimeout(f, g)) : (console.log("Failed to get content after max retries"),
                        l(t))
                }
                ;
                f()
            } else
                l(t)
        }
          , l = async o => {
            var d, a, h, g;
            try {
                R(!0);
                const p = (await chrome.storage.sync.get(["settings"])).settings || DEFAULT_SETTINGS
                  , u = p.models.find($ => $.model === p.selectedModel);
                if (!u)
                    throw new Error("未选择翻译模型");
                if (u.provider === "openai" && !p.openaiApiKey)
                    throw new Error("请先配置 OpenAI API 密钥");
                if (u.provider === "ali" && !p.aliApiKey)
                    throw new Error("请先配置阿里通义 API 密钥");
                const N = `你是一个 Reddit 用户，请用最自然的中文口语来翻译内容。要求：

        - 就像在跟朋友聊天一样，用最日常的口语来表达
        - 该皮一下的时候要皮，该正经的时候要正经，语气要贴合原文
        - 英文梗和网络用语要用对应的中文网络热词来翻译，让人一看就懂
        - 专业的东西用大白话解释，让小白也能看明白
        - 原文怎么排版就怎么排，该空行空行，该分点分点
        - 表情包和特殊符号看语境来用，不要生硬照搬

        记住：你就是个普通网友，用最接地气的方式翻译，让人感觉是在看中文社交平台的内容。`
                  , L = {
                    openai: {
                        url: u.apiUrl,
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${p.openaiApiKey}`
                        },
                        body: {
                            model: u.model,
                            messages: [{
                                role: "system",
                                content: N
                            }, {
                                role: "user",
                                content: o
                            }],
                            temperature: u.temperature || .7,
                            max_tokens: u.maxTokens || 2e3,
                            stream: !0
                        }
                    },
                    ali: {
                        url: u.apiUrl,
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${p.aliApiKey}`
                        },
                        body: {
                            model: u.model,
                            messages: [{
                                role: "system",
                                content: N
                            }, {
                                role: "user",
                                content: o
                            }],
                            parameters: {
                                temperature: u.temperature || .7,
                                max_tokens: u.maxTokens || 2e3
                            },
                            stream: !0,
                            stream_options: {
                                include_usage: !0
                            }
                        }
                    }
                }[u.provider]
                  , J = (d = (await fetch(L.url, {
                    method: "POST",
                    headers: {
                        ...L.headers,
                        Accept: "text/event-stream"
                    },
                    body: JSON.stringify(L.body)
                })).body) == null ? void 0 : d.getReader();
                let X = "";
                if (J)
                    for (; ; ) {
                        const {done: $, value: te} = await J.read();
                        if ($)
                            break;
                        const se = new TextDecoder().decode(te);
                        try {
                            const B = se.split(`
`);
                            for (const Y of B)
                                if (Y.startsWith("data: ")) {
                                    const Q = JSON.parse(Y.slice(5));
                                    (g = (h = (a = Q.choices) == null ? void 0 : a[0]) == null ? void 0 : h.delta) != null && g.content && (X += Q.choices[0].delta.content,
                                    n(X))
                                }
                        } catch (B) {
                            console.error("Error parsing streaming response:", B)
                        }
                    }
            } catch (f) {
                console.error("Translation error:", f),
                n(`翻译出错: ${f.message}`)
            } finally {
                R(!1)
            }
        }
        ;
        c()
    }
    , [t]),
    x.useEffect( () => {
        const l = setTimeout(async () => {
            if (b.trim())
                try {
                    E("翻译中...");
                    const d = (await chrome.storage.sync.get(["settings"])).settings || DEFAULT_SETTINGS
                      , a = d.models.find(H => H.model === d.selectedModel);
                    if (!a)
                        throw new Error("未选择翻译模型");
                    if (a.provider === "openai" && !d.openaiApiKey)
                        throw new Error("请先配置 OpenAI API 密钥");
                    if (a.provider === "ali" && !d.aliApiKey)
                        throw new Error("请先配置阿里通义 API 密钥");
                    const h = `你是一个 Reddit 老用户。请用最自然的方式把这段中文翻译成英文。要求：

            - 用轻松随意的口吻，就像在跟朋友聊天
            - 该用梗的时候就用梗，该开玩笑就开玩笑
            - 可以用一些 Reddit 常见的缩写，比如 tbh、ngl、imo 等，但别太刻意
            - 表情符号随意发挥，但要自然，不要过度使用
            - 遇到中文特有的表达，就想想老外会怎么说
            - 保持原文的基本结构，但可以适当调整让它更口语化

            记住：就是很随意地翻译，不要太正式，更不要让人觉得是机器翻译。就想象你是在跟 Reddit 的朋友们闲聊。`
                      , f = {
                        openai: {
                            url: a.apiUrl,
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${d.openaiApiKey}`
                            },
                            body: {
                                model: a.model,
                                messages: [{
                                    role: "system",
                                    content: h
                                }, {
                                    role: "user",
                                    content: b
                                }],
                                temperature: a.temperature || .7,
                                max_tokens: a.maxTokens || 2e3
                            }
                        },
                        ali: {
                            url: a.apiUrl,
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${d.aliApiKey}`
                            },
                            body: {
                                model: a.model,
                                messages: [{
                                    role: "system",
                                    content: h
                                }, {
                                    role: "user",
                                    content: b
                                }],
                                temperature: a.temperature || .7,
                                max_tokens: a.maxTokens || 2e3
                            }
                        }
                    }[a.provider]
                      , p = await fetch(f.url, {
                        method: "POST",
                        headers: f.headers,
                        body: JSON.stringify(f.body)
                    });
                    if (!p.ok)
                        throw new Error(`API请求失败: ${p.status} ${p.statusText}`);
                    const N = (await p.json()).choices[0].message.content;
                    E(N)
                } catch (o) {
                    console.error("Translation error:", o),
                    E("翻译错误: " + o.message)
                }
            else
                E("")
        }
        , 500);
        return () => clearTimeout(l)
    }
    , [b]);
    const K = c => {
        const l = c.target.value;
        T(l)
    }
      , W = async () => {
        try {
            if (console.log("Starting handleApply..."),
            !w.trim()) {
                console.error("No translated comment available");
                return
            }
            console.log("Translated comment available:", w);
            const c = document.querySelector('faceplate-tracker[source="comment_composer"][noun="add_comment_placeholder"] button[data-testid="trigger-button"]');
            if (!c || !(c instanceof HTMLElement)) {
                console.error("Placeholder button not found");
                return
            }
            c.removeAttribute("disabled"),
            c.click(),
            console.log("Clicked placeholder button"),
            await new Promise(g => setTimeout(g, 500));
            const l = document.querySelector("shreddit-composer");
            if (!l) {
                console.error("Shreddit composer not found");
                return
            }
            l.removeAttribute("aria-disabled"),
            l.removeAttribute("aria-readonly");
            const o = l.querySelector('div[slot="rte"][contenteditable="true"]');
            if (!o || !(o instanceof HTMLElement)) {
                console.error("Comment box not found");
                return
            }
            o.setAttribute("contenteditable", "true"),
            o.setAttribute("aria-disabled", "false"),
            o.removeAttribute("disabled"),
            o.removeAttribute("readonly"),
            o.focus(),
            await new Promise(g => setTimeout(g, 100));
            const d = document.createElement("p");
            d.className = "first:mt-0 last:mb-0",
            d.textContent = w.trim(),
            o.innerHTML = "",
            o.appendChild(d);
            const a = [new FocusEvent("focus",{
                bubbles: !0
            }), new MouseEvent("click",{
                bubbles: !0
            }), new InputEvent("beforeinput",{
                bubbles: !0,
                cancelable: !0,
                data: w
            }), new InputEvent("input",{
                bubbles: !0,
                cancelable: !0,
                data: w
            }), new Event("change",{
                bubbles: !0
            })];
            for (const g of a)
                o.dispatchEvent(g),
                await new Promise(f => setTimeout(f, 50));
            o.focus();
            const h = l.querySelector('button[type="submit"]');
            h instanceof HTMLElement && (h.removeAttribute("disabled"),
            h.classList.remove("disabled")),
            console.log("Comment box should now be active and contain the translated text")
        } catch (c) {
            console.error("Error in handleApply:", c)
        }
    }
      , q = async () => {
        try {
            D(!0);
            const l = (await chrome.storage.sync.get(["settings"])).settings || DEFAULT_SETTINGS
              , o = l.models.find(u => u.model === l.selectedModel);
            if (!o)
                throw new Error("未选择翻译模型");
            if (o.provider === "openai" && !l.openaiApiKey)
                throw new Error("请先配置 OpenAI API 密钥");
            if (o.provider === "ali" && !l.aliApiKey)
                throw new Error("请先配置阿里通义 API 密钥");
            const d = `你是一个普通的 Reddit 用户。请用最自然随意的方式，针对内容写一个评论。记住你就是一个普通人，在跟网友闲聊：

          - 就用日常口语，像跟朋友聊微信那样
          - 可以用表情符号和网络用语，但别太多
          - 想到什么说什么，不用太讲究措辞
          - 可以吐槽可以开玩笑，但别太过分
          - 分享自己的经历时要简短，别啰嗦
          - 说话要有人情味，别像复读机
          - 能用梗就用梗，但别太刻意
          - 说错话认错也没关系，显得真实

          记住：
          - 就是很随意地聊天，不要太正经
          - 只用中文回复
          - 不要解释，直接说话就行

          总之，就是很随意地跟帖，不要想太多，说话要接地气。`
              , h = {
                openai: {
                    url: o.apiUrl,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${l.openaiApiKey}`
                    },
                    body: {
                        model: o.model,
                        messages: [{
                            role: "system",
                            content: d
                        }, {
                            role: "user",
                            content: t
                        }],
                        temperature: .7,
                        max_tokens: 500
                    }
                },
                ali: {
                    url: o.apiUrl,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${l.aliApiKey}`
                    },
                    body: {
                        model: o.model,
                        messages: [{
                            role: "system",
                            content: d
                        }, {
                            role: "user",
                            content: t
                        }],
                        parameters: {
                            temperature: .7,
                            max_tokens: 500
                        }
                    }
                }
            }[o.provider]
              , p = (await (await fetch(h.url, {
                method: "POST",
                headers: h.headers,
                body: JSON.stringify(h.body)
            })).json()).choices[0].message.content;
            T(p)
        } catch (c) {
            console.error("生成评论时出错:", c)
        } finally {
            D(!1)
        }
    }
      , M = m.length > 200
      , F = s ? m : M ? m.slice(0, 200) + "..." : m
      , G = c => {
        c.preventDefault(),
        U(!0),
        y.current = {
            startX: c.clientX,
            startY: c.clientY,
            startPos: {
                ...C
            }
        }
    }
      , I = x.useCallback(c => {
        if (v && y.current) {
            const l = c.clientX - y.current.startX
              , o = c.clientY - y.current.startY
              , d = Math.max(0, Math.min(window.innerWidth - 100, y.current.startPos.x + l))
              , a = Math.max(0, Math.min(window.innerHeight - 40, y.current.startPos.y + o));
            ee({
                x: d,
                y: a
            })
        }
    }
    , [v])
      , P = x.useCallback( () => {
        U(!1),
        y.current = void 0
    }
    , []);
    return x.useEffect( () => (v && (window.addEventListener("mousemove", I),
    window.addEventListener("mouseup", P)),
    () => {
        window.removeEventListener("mousemove", I),
        window.removeEventListener("mouseup", P)
    }
    ), [v, I, P]),
    i ? e.jsxs("div", {
        className: "fixed right-0 top-[20%] z-50",
        children: [k && e.jsx("div", {
            style: {
                position: "fixed",
                left: `${C.x}px`,
                top: `${C.y}px`,
                cursor: v ? "grabbing" : "grab",
                touchAction: "none",
                zIndex: 9999
            },
            onMouseDown: G,
            className: "select-none",
            title: "展开翻译面板",
            children: e.jsxs("button", {
                onClick: () => !v && S(!1),
                className: `flex items-center gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 \r
              text-white rounded-l-lg shadow-lg transition-colors`,
                children: [e.jsx("svg", {
                    className: "w-5 h-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: e.jsx("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                    })
                }), e.jsx("span", {
                    children: "翻译"
                })]
            })
        }), e.jsxs("div", {
            className: `fixed right-0 top-0 h-screen bg-white shadow-lg transition-transform duration-300 ${k ? "translate-x-full" : ""}`,
            style: {
                width: "400px",
                maxWidth: "100vw"
            },
            children: [e.jsx("button", {
                onClick: () => S(!0),
                className: "absolute top-4 left-4 z-10 p-2 rounded-full hover:bg-gray-100 transition-colors",
                title: "收起翻译面板",
                children: e.jsx("svg", {
                    className: "w-5 h-5 text-gray-600",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: e.jsx("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M9 5l7 7-7 7"
                    })
                })
            }), e.jsxs("div", {
                className: "h-full overflow-y-auto p-4 pt-16 custom-scrollbar",
                children: [e.jsx("div", {
                    className: "mb-4",
                    children: e.jsxs("div", {
                        className: `bg-gray-100 p-3 rounded ${O ? "opacity-50" : ""}`,
                        children: [F, M && e.jsx("button", {
                            className: "text-blue-500 hover:text-blue-600 mt-2 text-sm",
                            onClick: () => r(!s),
                            children: s ? "收起" : "展开"
                        })]
                    })
                }), e.jsxs("div", {
                    className: "mb-4",
                    children: [e.jsxs("div", {
                        className: "flex justify-between items-center mb-2",
                        children: [e.jsx("h3", {
                            className: "text-md font-bold",
                            children: "评论"
                        }), e.jsx("div", {
                            children: e.jsx("button", {
                                className: `px-3 py-1 rounded text-sm ${j ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"}`,
                                onClick: q,
                                disabled: j,
                                children: j ? "生成中..." : "AI生成评论"
                            })
                        })]
                    }), e.jsxs("div", {
                        className: "mb-3 p-3 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-700",
                        children: ["⚠️ 请注意：AI生成的评论可能缺乏个性化和真实性。建议：", e.jsxs("ul", {
                            className: "list-disc ml-4 mt-1",
                            children: [e.jsx("li", {
                                children: "仅作为写作灵感和参考"
                            }), e.jsx("li", {
                                children: "根据个人观点和经历修改内容"
                            }), e.jsx("li", {
                                children: "确保评论真实反映您的想法"
                            })]
                        })]
                    }), e.jsx("textarea", {
                        className: "w-full h-32 p-2 border rounded mb-2",
                        placeholder: "输入中文评论...",
                        value: b,
                        onChange: K
                    }), e.jsxs("div", {
                        className: "bg-gray-100 p-3 rounded mb-2",
                        children: [e.jsx("h4", {
                            className: "font-bold mb-1",
                            children: "翻译预览"
                        }), w]
                    }), e.jsx("button", {
                        className: "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600",
                        onClick: W,
                        children: "应用翻译"
                    })]
                }), e.jsxs("div", {
                    className: "mt-8 pt-4 border-t border-gray-200",
                    children: [e.jsx("p", {
                        className: "text-sm text-gray-600 mb-3",
                        children: "遇到问题？欢迎联系作者："
                    }), e.jsxs("div", {
                        className: "grid grid-cols-2 gap-4",
                        children: [e.jsxs("div", {
                            className: "space-y-2 text-sm",
                            children: [e.jsxs("div", {
                                className: "flex items-center space-x-2",
                                children: [e.jsx("svg", {
                                    className: "w-3.5 h-3.5 text-gray-600",
                                    fill: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: e.jsx("path", {
                                        d: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                                    })
                                }), e.jsx("a", {
                                    href: "https://twitter.com/justinleei",
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    className: "text-blue-500 hover:text-blue-600",
                                    children: "@justinleei"
                                })]
                            }), e.jsxs("div", {
                                className: "flex items-center space-x-2",
                                children: [e.jsx("svg", {
                                    className: "w-3.5 h-3.5 text-gray-600",
                                    fill: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: e.jsx("path", {
                                        d: "M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"
                                    })
                                }), e.jsx("a", {
                                    href: "https://t.me/justinleei",
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    className: "text-blue-500 hover:text-blue-600",
                                    children: "@justinleei"
                                })]
                            })]
                        }), e.jsxs("div", {
                            className: "space-y-2 text-sm",
                            children: [e.jsxs("div", {
                                className: "flex items-center space-x-2",
                                children: [e.jsx("svg", {
                                    className: "w-3.5 h-3.5 text-gray-600",
                                    fill: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: e.jsx("path", {
                                        d: "M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 2.344-6.432 2.183-1.46 5.127-1.692 7.576-.709 0-3.935-3.817-7.49-8.731-7.49zm-.587 3.666a1.08 1.08 0 0 1 1.077 1.078 1.08 1.08 0 0 1-1.077 1.079 1.08 1.08 0 0 1-1.078-1.079 1.08 1.08 0 0 1 1.078-1.078zm5.896 0a1.08 1.08 0 0 1 1.078 1.078 1.08 1.08 0 0 1-1.078 1.079 1.08 1.08 0 0 1-1.077-1.079 1.08 1.08 0 0 1 1.077-1.078zm9.07 5.95c-3.804 0-6.895 2.623-6.895 5.557 0 .96.226 1.869.627 2.684-.238.014-.476.021-.716.021a8.505 8.505 0 0 1-2.352-.334.723.723 0 0 0-.6.082l-1.591.93a.27.27 0 0 1-.14.047.249.249 0 0 1-.244-.25c0-.06.025-.118.04-.178l.328-1.235a.495.495 0 0 0-.178-.555C9.694 16.92 8.73 15.292 8.73 13.51c0-3.051 2.967-5.557 6.895-5.557 3.929 0 6.895 2.506 6.895 5.557 0 3.05-2.966 5.557-6.895 5.557zm-3.653-2.89a.903.903 0 0 1-.902-.901.903.903 0 0 1 .902-.902.903.903 0 0 1 .902.902.903.903 0 0 1-.902.901zm4.844 0a.903.903 0 0 1-.901-.901.903.903 0 0 1 .901-.902.903.903 0 0 1 .902.902.903.903 0 0 1-.902.901z"
                                    })
                                }), e.jsx("span", {
                                    className: "text-gray-700",
                                    children: "JustinLeei"
                                })]
                            }), e.jsxs("div", {
                                className: "flex items-center space-x-2",
                                children: [e.jsx("svg", {
                                    className: "w-3.5 h-3.5 text-gray-600",
                                    fill: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: e.jsx("path", {
                                        d: "M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 16.057v-3.057h2.994c-.059 1.143-.212 2.24-.456 3.279-.823-.12-1.674-.188-2.538-.222zm1.957 2.162c-.499 1.33-1.159 2.497-1.957 3.456v-3.62c.666.028 1.319.081 1.957.164zm-1.957-7.219v-3.015c.868-.034 1.721-.103 2.548-.224.238 1.027.389 2.111.446 3.239h-2.994zm0-5.014v-3.661c.806.969 1.471 2.15 1.971 3.496-.642.084-1.3.137-1.971.165zm2.703-3.267c1.237.496 2.354 1.228 3.29 2.146-.642.234-1.311.442-2.019.607-.344-.992-.775-1.91-1.271-2.753zm-7.241 13.56c-.244-1.039-.398-2.136-.456-3.279h2.994v3.057c-.865.034-1.714.102-2.538.222zm2.538 1.776v3.62c-.798-.959-1.458-2.126-1.957-3.456.638-.083 1.291-.136 1.957-.164zm-2.994-7.055c.057-1.128.207-2.212.446-3.239.827.121 1.68.19 2.548.224v3.015h-2.994zm1.024-5.179c.5-1.346 1.165-2.527 1.97-3.496v3.661c-.671-.028-1.329-.081-1.97-.165zm-2.005-.35c-.708-.165-1.377-.373-2.018-.607.937-.918 2.053-1.65 3.29-2.146-.496.844-.927 1.762-1.272 2.753zm-.549 1.918c-.264 1.151-.434 2.36-.492 3.611h-3.933c.165-1.658.739-3.197 1.617-4.518.88.361 1.816.67 2.808.907zm.009 9.262c-.988.236-1.92.542-2.797.9-.89-1.328-1.471-2.879-1.637-4.551h3.934c.058 1.265.231 2.488.5 3.651zm.553 1.917c.342.976.768 1.881 1.257 2.712-1.223-.49-2.326-1.211-3.256-2.115.636-.229 1.299-.435 1.999-.597zm9.924 0c.7.163 1.362.367 1.999.597-.931.903-2.034 1.625-3.257 2.116.489-.832.915-1.737 1.258-2.713zm.553-1.917c.27-1.163.442-2.386.501-3.651h3.934c-.167 1.672-.748 3.223-1.638 4.551-.877-.358-1.81-.664-2.797-.9zm.501-5.651c-.058-1.251-.229-2.46-.492-3.611.992-.237 1.929-.546 2.809-.907.877 1.321 1.451 2.86 1.616 4.518h-3.933z"
                                    })
                                }), e.jsx("a", {
                                    href: "https://justinleei.com",
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    className: "text-blue-500 hover:text-blue-600",
                                    children: "justinleei.com"
                                })]
                            })]
                        })]
                    })]
                })]
            })]
        })]
    }) : e.jsxs("div", {
        className: "fixed right-0 top-[20%] z-50",
        children: [k && e.jsx("div", {
            style: {
                position: "fixed",
                left: `${C.x}px`,
                top: `${C.y}px`,
                cursor: v ? "grabbing" : "grab",
                touchAction: "none",
                zIndex: 9999
            },
            onMouseDown: G,
            className: "select-none",
            title: "展开翻译面板",
            children: e.jsxs("button", {
                onClick: () => !v && S(!1),
                className: `flex items-center gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 \r
                text-white rounded-l-lg shadow-lg transition-colors`,
                children: [e.jsx("svg", {
                    className: "w-5 h-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: e.jsx("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                    })
                }), e.jsx("span", {
                    children: "翻译"
                })]
            })
        }), e.jsxs("div", {
            className: `fixed right-0 top-0 h-screen bg-white shadow-lg transition-transform duration-300 ${k ? "translate-x-full" : ""}`,
            style: {
                width: "400px",
                maxWidth: "100vw"
            },
            children: [e.jsx("button", {
                onClick: () => S(!0),
                className: "absolute top-4 left-4 z-10 p-2 rounded-full hover:bg-gray-100 transition-colors",
                title: "收起翻译面板",
                children: e.jsx("svg", {
                    className: "w-5 h-5 text-gray-600",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: e.jsx("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M9 5l7 7-7 7"
                    })
                })
            }), e.jsxs("div", {
                className: "h-full overflow-y-auto p-4 pt-16 custom-scrollbar",
                children: [e.jsx("div", {
                    className: "mb-4",
                    children: e.jsxs("div", {
                        className: `bg-gray-100 p-3 rounded ${O ? "opacity-50" : ""}`,
                        children: [F, M && e.jsx("button", {
                            className: "text-blue-500 hover:text-blue-600 mt-2 text-sm",
                            onClick: () => r(!s),
                            children: s ? "收起" : "展开"
                        })]
                    })
                }), e.jsxs("div", {
                    className: "mb-4",
                    children: [e.jsxs("div", {
                        className: "flex justify-between items-center mb-2",
                        children: [e.jsx("h3", {
                            className: "text-md font-bold",
                            children: "评论"
                        }), e.jsx("div", {
                            children: e.jsx("button", {
                                className: `px-3 py-1 rounded text-sm ${j ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"}`,
                                onClick: q,
                                disabled: j,
                                children: j ? "生成中..." : "AI生成评论"
                            })
                        })]
                    }), e.jsxs("div", {
                        className: "mb-3 p-3 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-700",
                        children: ["⚠️ 请注意：AI生成的评论可能缺乏个性化和真实性。建议：", e.jsxs("ul", {
                            className: "list-disc ml-4 mt-1",
                            children: [e.jsx("li", {
                                children: "仅作为写作灵感和参考"
                            }), e.jsx("li", {
                                children: "根据个人观点和经历修改内容"
                            }), e.jsx("li", {
                                children: "确保评论真实反映您的想法"
                            })]
                        })]
                    }), e.jsx("textarea", {
                        className: "w-full h-32 p-2 border rounded mb-2",
                        placeholder: "输入中文评论...",
                        value: b,
                        onChange: K
                    }), e.jsxs("div", {
                        className: "bg-gray-100 p-3 rounded mb-2",
                        children: [e.jsx("h4", {
                            className: "font-bold mb-1",
                            children: "翻译预览"
                        }), w]
                    }), e.jsx("button", {
                        className: "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600",
                        onClick: W,
                        children: "应用翻译"
                    })]
                }), e.jsxs("div", {
                    className: "mt-8 pt-4 border-t border-gray-200",
                    children: [e.jsx("p", {
                        className: "text-sm text-gray-600 mb-3",
                        children: "遇到问题？欢迎联系作者："
                    }), e.jsxs("div", {
                        className: "grid grid-cols-2 gap-4",
                        children: [e.jsxs("div", {
                            className: "space-y-2 text-sm",
                            children: [e.jsxs("div", {
                                className: "flex items-center space-x-2",
                                children: [e.jsx("svg", {
                                    className: "w-3.5 h-3.5 text-gray-600",
                                    fill: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: e.jsx("path", {
                                        d: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                                    })
                                }), e.jsx("a", {
                                    href: "https://twitter.com/justinleei",
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    className: "text-blue-500 hover:text-blue-600",
                                    children: "@justinleei"
                                })]
                            }), e.jsxs("div", {
                                className: "flex items-center space-x-2",
                                children: [e.jsx("svg", {
                                    className: "w-3.5 h-3.5 text-gray-600",
                                    fill: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: e.jsx("path", {
                                        d: "M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"
                                    })
                                }), e.jsx("a", {
                                    href: "https://t.me/justinleei",
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    className: "text-blue-500 hover:text-blue-600",
                                    children: "@justinleei"
                                })]
                            })]
                        }), e.jsxs("div", {
                            className: "space-y-2 text-sm",
                            children: [e.jsxs("div", {
                                className: "flex items-center space-x-2",
                                children: [e.jsx("svg", {
                                    className: "w-3.5 h-3.5 text-gray-600",
                                    fill: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: e.jsx("path", {
                                        d: "M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 2.344-6.432 2.183-1.46 5.127-1.692 7.576-.709 0-3.935-3.817-7.49-8.731-7.49zm-.587 3.666a1.08 1.08 0 0 1 1.077 1.078 1.08 1.08 0 0 1-1.077 1.079 1.08 1.08 0 0 1-1.078-1.079 1.08 1.08 0 0 1 1.078-1.078zm5.896 0a1.08 1.08 0 0 1 1.078 1.078 1.08 1.08 0 0 1-1.078 1.079 1.08 1.08 0 0 1-1.077-1.079 1.08 1.08 0 0 1 1.077-1.078zm9.07 5.95c-3.804 0-6.895 2.623-6.895 5.557 0 .96.226 1.869.627 2.684-.238.014-.476.021-.716.021a8.505 8.505 0 0 1-2.352-.334.723.723 0 0 0-.6.082l-1.591.93a.27.27 0 0 1-.14.047.249.249 0 0 1-.244-.25c0-.06.025-.118.04-.178l.328-1.235a.495.495 0 0 0-.178-.555C9.694 16.92 8.73 15.292 8.73 13.51c0-3.051 2.967-5.557 6.895-5.557 3.929 0 6.895 2.506 6.895 5.557 0 3.05-2.966 5.557-6.895 5.557zm-3.653-2.89a.903.903 0 0 1-.902-.901.903.903 0 0 1 .902-.902.903.903 0 0 1 .902.902.903.903 0 0 1-.902.901zm4.844 0a.903.903 0 0 1-.901-.901.903.903 0 0 1 .901-.902.903.903 0 0 1 .902.902.903.903 0 0 1-.902.901z"
                                    })
                                }), e.jsx("span", {
                                    className: "text-gray-700",
                                    children: "JustinLeei"
                                })]
                            }), e.jsxs("div", {
                                className: "flex items-center space-x-2",
                                children: [e.jsx("svg", {
                                    className: "w-3.5 h-3.5 text-gray-600",
                                    fill: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: e.jsx("path", {
                                        d: "M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 16.057v-3.057h2.994c-.059 1.143-.212 2.24-.456 3.279-.823-.12-1.674-.188-2.538-.222zm1.957 2.162c-.499 1.33-1.159 2.497-1.957 3.456v-3.62c.666.028 1.319.081 1.957.164zm-1.957-7.219v-3.015c.868-.034 1.721-.103 2.548-.224.238 1.027.389 2.111.446 3.239h-2.994zm0-5.014v-3.661c.806.969 1.471 2.15 1.971 3.496-.642.084-1.3.137-1.971.165zm2.703-3.267c1.237.496 2.354 1.228 3.29 2.146-.642.234-1.311.442-2.019.607-.344-.992-.775-1.91-1.271-2.753zm-7.241 13.56c-.244-1.039-.398-2.136-.456-3.279h2.994v3.057c-.865.034-1.714.102-2.538.222zm2.538 1.776v3.62c-.798-.959-1.458-2.126-1.957-3.456.638-.083 1.291-.136 1.957-.164zm-2.994-7.055c.057-1.128.207-2.212.446-3.239.827.121 1.68.19 2.548.224v3.015h-2.994zm1.024-5.179c.5-1.346 1.165-2.527 1.97-3.496v3.661c-.671-.028-1.329-.081-1.97-.165zm-2.005-.35c-.708-.165-1.377-.373-2.018-.607.937-.918 2.053-1.65 3.29-2.146-.496.844-.927 1.762-1.272 2.753zm-.549 1.918c-.264 1.151-.434 2.36-.492 3.611h-3.933c.165-1.658.739-3.197 1.617-4.518.88.361 1.816.67 2.808.907zm.009 9.262c-.988.236-1.92.542-2.797.9-.89-1.328-1.471-2.879-1.637-4.551h3.934c.058 1.265.231 2.488.5 3.651zm.553 1.917c.342.976.768 1.881 1.257 2.712-1.223-.49-2.326-1.211-3.256-2.115.636-.229 1.299-.435 1.999-.597zm9.924 0c.7.163 1.362.367 1.999.597-.931.903-2.034 1.625-3.257 2.116.489-.832.915-1.737 1.258-2.713zm.553-1.917c.27-1.163.442-2.386.501-3.651h3.934c-.167 1.672-.748 3.223-1.638 4.551-.877-.358-1.81-.664-2.797-.9zm.501-5.651c-.058-1.251-.229-2.46-.492-3.611.992-.237 1.929-.546 2.809-.907.877 1.321 1.451 2.86 1.616 4.518h-3.933z"
                                    })
                                }), e.jsx("a", {
                                    href: "https://justinleei.com",
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    className: "text-blue-500 hover:text-blue-600",
                                    children: "justinleei.com"
                                })]
                            })]
                        })]
                    })]
                })]
            })]
        })]
    })
}
;
function ne() {
    const t = new Set;
    return new IntersectionObserver(m => {
        m.forEach(n => {
            if (n.isIntersecting) {
                const s = n.target
                  , r = s.getAttribute("comment-id");
                r && !t.has(r) && ae(s, r, t)
            }
        }
        )
    }
    ,{
        root: null,
        rootMargin: "50px",
        threshold: .1
    })
}
function ae(t, i, m) {
    var n;
    try {
        const s = document.createElement("div");
        s.className = `interaction-button-${i}`,
        s.style.cssText = `
      display: inline-flex !important;
      align-items: center;
      margin: 0 8px;
      visibility: visible !important;
      opacity: 1 !important;
    `;
        const r = t.querySelector('[slot="overflow"]');
        if (r) {
            const b = document.createElement("div");
            b.setAttribute("slot", "overflow"),
            b.appendChild(s),
            r.insertAdjacentElement("beforebegin", b),
            V(s).render(e.jsx(oe, {
                commentId: i,
                authorName: ((n = t.closest("shreddit-comment")) == null ? void 0 : n.getAttribute("author")) || ""
            })),
            m.add(i)
        }
    } catch (s) {
        console.error("渲染互动按钮时出错:", s)
    }
}
const ie = () => {
    const t = ne()
      , i = new MutationObserver(m => {
        m.some(s => s.target.nodeType === Node.ELEMENT_NODE && s.target.closest("shreddit-comment, shreddit-comment-action-row")) && z() && document.querySelectorAll("shreddit-comment-action-row").forEach(r => {
            r.hasAttribute("data-observed") || (t.observe(r),
            r.setAttribute("data-observed", "true"))
        }
        )
    }
    );
    return i.observe(document.documentElement, {
        childList: !0,
        subtree: !0,
        attributes: !1,
        characterData: !1
    }),
    z() && document.querySelectorAll("shreddit-comment-action-row").forEach(n => {
        n.hasAttribute("data-observed") || (t.observe(n),
        n.setAttribute("data-observed", "true"))
    }
    ),
    () => {
        i.disconnect(),
        t.disconnect()
    }
}
;
function le() {
    let t = window.location.href;
    const i = history.pushState
      , m = history.replaceState;
    history.pushState = function(...s) {
        i.apply(this, s),
        t !== window.location.href && (t = window.location.href,
        A())
    }
    ,
    history.replaceState = function(...s) {
        m.apply(this, s),
        t !== window.location.href && (t = window.location.href,
        A())
    }
    ,
    window.addEventListener("popstate", () => {
        t !== window.location.href && (t = window.location.href,
        A())
    }
    );
    const n = new MutationObserver( () => {
        t !== window.location.href && (t = window.location.href,
        A())
    }
    );
    return n.observe(document.documentElement, {
        childList: !0,
        subtree: !0
    }),
    setTimeout( () => {
        A()
    }
    , 1e3),
    n
}
function A() {
    if (console.log("URL changed:", window.location.href),
    z()) {
        let t = 0;
        const i = 10
          , m = 200
          , n = () => {
            const {title: s, content: r} = _();
            if (console.log("Checking content:", {
                title: s,
                content: r
            }),
            s || r) {
                const b = document.getElementById("reddit-translator-root");
                b && b.remove(),
                Z()
            } else
                t < i ? (t++,
                console.log(`Retry ${t}/${i}`),
                setTimeout(n, m)) : console.log("Failed to find content after max retries")
        }
        ;
        n()
    } else {
        const t = document.getElementById("reddit-translator-root");
        t && t.remove()
    }
}
function ce() {
    console.log("开始初始化..."),
    le(),
    ie(),
    z() && Z()
}
async function Z() {
    console.log("Injecting translation panel...");
    try {
        const t = z()
          , {title: i, content: m} = t ? _() : {
            title: "",
            content: ""
        }
          , n = t ? `标题：${i.trim()}
正文：${m.trim()}` : ""
          , s = document.createElement("div");
        s.id = "reddit-translator-root",
        document.body.appendChild(s),
        V(s).render(e.jsx(re, {
            originalText: n,
            isPostPage: t
        }))
    } catch (t) {
        console.error("Error injecting translation panel:", t)
    }
}
ce();
function _() {
    const t = ["shreddit-post[post-title]", 'h1[data-testid="post-title"]', 'div[data-testid="post-container"] h1', 'div[data-test-id="post-content"] h1', 'div[slot="title"]'];
    let i = "";
    for (const s of t)
        try {
            const r = document.querySelector(s);
            if (r && (s === "shreddit-post[post-title]" ? i = r.getAttribute("post-title") || "" : i = r.textContent || "",
            i.trim())) {
                console.log("Found title:", i);
                break
            }
        } catch (r) {
            console.error(`Error with selector ${s}:`, r)
        }
    const m = ['shreddit-post div[slot="text-body"] div.md', 'div[data-click-id="text"] div.md', 'div[data-test-id="post-content"] div[data-click-id="text"]', 'div[slot="text-body"]'];
    let n = "";
    for (const s of m)
        try {
            const r = document.querySelector(s);
            if (r && (n = r.textContent || "",
            n.trim())) {
                console.log("Found content:", n);
                break
            }
        } catch (r) {
            console.error(`Error with selector ${s}:`, r)
        }
    return {
        title: i.trim(),
        content: n.trim()
    }
}
function z() {
    const t = window.location.href;
    return /^https?:\/\/(www\.)?reddit\.com\/r\/[^\/]+\/comments\//.test(t)
}
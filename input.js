(function () {
    try {
        function _x(a, b) {
            return a ^ b;
        }

        function _b64(s) {
            return typeof btoa !== "undefined"
                ? btoa(s)
                : Buffer.from(s, "binary").toString("base64");
        }

        function _db64(s) {
            return typeof atob !== "undefined"
                ? atob(s)
                : Buffer.from(s, "base64").toString("binary");
        }

        function _enc(str) {
            let r = "";
            for (let i = 0; i < str.length; i++) {
                r += String.fromCharCode(_x(str.charCodeAt(i), 7));
            }
            return _b64(r);
        }

        function _dec(str) {
            let t = _db64(str);
            let r = "";
            for (let i = 0; i < t.length; i++) {
                r += String.fromCharCode(_x(t.charCodeAt(i), 7));
            }
            return r;
        }

        const _S = [
            _enc("url"),
            _enc("headers"),
            _enc("read"),
            _enc("lynn_github_token"),
            _enc("Authorization"),
            _enc("token "),
            _enc("Host"),
            _enc("raw.githubusercontent.com"),
            _enc("Cookie"),
            _enc("Referer")
        ];

        function _G(i) {
            return _dec(_S[i]);
        }

        const _req = new URL($request[_G(0)]);
        const _newUrl =
            _enc("https://raw.githubusercontent.com") &&
            _dec(_enc("https://raw.githubusercontent.com")) +
                _req.pathname +
                _req.search;

        const _token = $persistentStore[_G(2)](_G(3)) || "";

        const _headers = (function () {
            const h = {
                ...$request[_G(1)],
                [_G(4)]: _G(5) + _token,
                [_G(6)]: _G(7)
            };
            return h;
        })();

        delete _headers[_G(8)];
        delete _headers[_G(9)];

        $done({
            url: _newUrl,
            headers: _headers
        });
    } catch (e) {
        $done({});
    }
})();

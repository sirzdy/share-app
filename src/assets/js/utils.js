export default {
    hint(msg, type, duration) {
        duration = isNaN(duration) ? 1500 : duration;
        var m = document.createElement('div');
        m.innerHTML = msg;
        var backgroundColor, color;
        if (type == 'suc') {
            backgroundColor = "#3c763d";
            color = "#ffffff";
        } else if (type == 'fail') {
            backgroundColor = "#8a6d3b";
            color = "#ffffff";
        } else {
            backgroundColor = "#3c763d";
            color = "#ffffff";
        }
        m.style.cssText = "width: 60%;min-width: 150px;opacity: 0.9;padding: 10px 0;color: " + color + ";line-height: 30px;text-align: center;border-radius: 5px;position: fixed;top: 60px;left: 50%;transform:translateX(-50%);z-index: 999999;background: " + backgroundColor + ";font-size: 12px;";
        document.body.appendChild(m);
        setTimeout(function () {
            var d = 0.5;
            m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
            m.style.opacity = '0';
            setTimeout(function () { document.body.removeChild(m) }, d * 1000);
        }, duration);
    },
    setTitle(title) {
        // console.log(1);
        document.title = title
        let isIOS = /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)
        if (isIOS) {
            let iframe = document.createElement('iframe')
            iframe.style.display = 'none'
            // iframe.src = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg=='
            // iframe.src = '//storage.360buyimg.com/cms/lxy/jdLogo.jpg'
            iframe.addEventListener('load', function () {
                setTimeout(function () {
                    document.body.removeChild(iframe)
                }, 0)
            })
            document.body.appendChild(iframe)
        }
    },
} 
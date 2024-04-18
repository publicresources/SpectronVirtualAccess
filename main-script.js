const middleware_localpath = "/data/local/tmp/spmiddleware.js"
const middleware_web_url = "https://github.com/publicresources/SpectronVirtualAccess/middleware.js"


function SaveMiddleWare(script_content) {
    const file = new File(middleware_localpath, "w")
    file.write(script_content)
    file.close()
}


function httpGet(targetUrl, onReceive) {
    Java.perform(function () {
        const URL = Java.use("java.net.URL");
        const HttpURLConnection = Java.use("java.net.HttpURLConnection");
        const BufferedReader = Java.use("java.io.BufferedReader");
        const InputStreamReader = Java.use("java.io.InputStreamReader");
        const url = URL.$new(Java.use("java.lang.String").$new(targetUrl));
        const connection = Java.cast(url.openConnection(), HttpURLConnection);
        connection.setRequestMethod("GET");
        connection.setRequestProperty("Content-Type", "application/json");
        connection.setConnectTimeout(5000);
        connection.setReadTimeout(5000);

        const responseCode = connection.getResponseCode();
        
        let responseData = null;

        if (responseCode === 200) {
            const inputStream = connection.getInputStream();
            const bufferedReader = BufferedReader.$new(InputStreamReader.$new(inputStream));
            let line = null;
            let data = []

            while ((line = bufferedReader.readLine()) !== null) {
                data.push(line)
            }

            responseData = data.join("\n")
        } else {
            responseData = "error: " + responseCode;
        }

       
        connection.disconnect();
        onReceive(responseData, responseCode);
    });
}



httpGet(middleware_web_url, function(data, code) {
    if ( code != 200) {
    }else{
        SaveMiddleWare(data)
    }
})




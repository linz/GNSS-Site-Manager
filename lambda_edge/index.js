'use strict';
exports.handler = (event, context, callback) => {
    //Get contents of response
    const response = event.Records[0].cf.response;
    console.log('Request', event.Records[0].cf.request.method, event.Records[0].cf.request.uri, event.Records[0].cf.request.querystring);
    
    const headers = response['headers'];

    //Set new headers 
     headers['strict-transport-security'] = [{key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubdomains; preload'}]; 

     headers['content-security-policy'] = [{key: 'Content-Security-Policy', value: " default-src 'self'; \
        script-src 'self' \
            'unsafe-eval' https://www.google-analytics.com \
            'sha256-wDZTYgWmWuonYjwgwE2OtXii4eWbW+hRc3cGrevzlCo=' \
            'sha256-wpNwlMyjGjDwIAcBJiUBCKxZ2jBi0UOxMyzg6XiJR98=' \
            'sha256-QYVH3ft1qayKY4mriwl5bRPIGE3fyB2YMmhyysIyxFA=' \
            'sha256-NKS+bV57QIcAApQBsM+A78LQSASnPJklAG9c5OjDwEM=' \
            'sha256-wpNwlMyjGjDwIAcBJiUBCKxZ2jBi0UOxMyzg6XiJR98='  \
            'sha256-Wo6lx4FhGeZAyqi+lUD/5dmZR4mrXylPZLTBGvlt6cw=' \
            'sha256-LQgRrnVUP6mD8/Crb8HPEfIPFF3APhaM0jsfl1VDlYE=' ; \
        img-src 'self' \
            https://www.google-analytics.com data:; \
        connect-src 'self' \
            https://cognito-idp.ap-southeast-2.amazonaws.com  \
            https://sitelog-prod.auth.ap-southeast-2.amazoncognito.com \
            https://sitelogprod-geoserver.geodesy.linz.govt.nz \
            https://sitelogprod-webservices.geodesy.linz.govt.nz \
            https://www.google-analytics.com ; \
        object-src 'none';  \
        font-src 'self' data:;  \
        style-src 'self' 'unsafe-inline'; "}]; 
     headers['x-content-type-options'] = [{key: 'X-Content-Type-Options', value: 'nosniff'}]; 
     headers['x-frame-options'] = [{key: 'X-Frame-Options', value: 'DENY'}]; 
     headers['x-xss-protection'] = [{key: 'X-XSS-Protection', value: '1; mode=block'}]; 
     headers['referrer-policy'] = [{key: 'Referrer-Policy', value: 'same-origin'}]; 
     headers['feature-policy'] = [{key: 'Feature-Policy', value: "camera 'none'; microphone 'none'; speaker 'none' "}]; 
     
    console.log(JSON.stringify(response, null, 4));
    //Return modified response
    callback(null, response);
};
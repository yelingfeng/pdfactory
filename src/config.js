/**
 * Created by  on 2016/4/1.
 */
export const API_ROOT = (process.env.NODE_ENV === 'production')
    ?'http://localhost:8080/cubp-platform-pdfactory-web/'
    :'http://localhost:3030'

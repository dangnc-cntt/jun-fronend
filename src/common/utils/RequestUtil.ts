//import {loginStore} from "../../modules/authen/login/LoginStore";
import StorageService from "../service/StorageService";
import queryString, {ParseOptions} from 'query-string';


class RequestUtil {

    public getUserId() {
        // if (loginStore.isLogin === true) {
        //     return "_me"
        // } else {
            return StorageService.getUUID();
        // }
    }

    public queryParam(props: any) {
        if(props.location){
            return queryString.parse( props.location.search, {parseBooleans: true});
        }
    }

    public saveQueryParam(props: any, changeParams: any) {
        
        let params = {...this.queryParam(props), ...changeParams};

        if(props.history && props.location){
           
            props.history.push(props.location.pathname + "?" + queryString.stringify(params));
            props.location.search = queryString.stringify(params)
        }
    }

    
}

export const requestUtils = new RequestUtil();

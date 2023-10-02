import {useQuery, UseQueryOptions} from "@tanstack/react-query";
import axios from "axios";
import {getQueryKeysFromParamsObject} from "@/lib/utils.ts";
import {GETssoUrl, GETssoUrlApiUrl, GETssoUrlParams} from "@/api-types/sso/GETssoUrl.ts";

export default function useGETssoUrl(params: GETssoUrlParams, queryConfig?: UseQueryOptions<GETssoUrl, Error, GETssoUrl, string[]>) {

    return useQuery(['ssoUrl', ...getQueryKeysFromParamsObject(params)], async () => {
        const res = await axios.get(GETssoUrlApiUrl({
            ...params
        }), {
            params: {
                "access_token": localStorage.getItem('access_token') || '',
                ...params,
            }
        });

        if (res.status !== 200) throw new Error(res.statusText);

        return res.data;
    }, {
        ...queryConfig
    })
}
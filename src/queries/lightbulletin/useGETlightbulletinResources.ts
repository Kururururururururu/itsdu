import {useQuery, UseQueryOptions} from "@tanstack/react-query";
import axios from "axios";
import {getQueryKeysFromParamsObject} from "@/lib/utils.ts";
import {
    GETlightbulletinResources,
    GETlightbulletinResourcesApiUrl,
    GETlightbulletinResourcesParams
} from "@/api-types/lightbulletin/GETlightbulletinResources.ts";

export default function useGETlightbulletinResources(params: GETlightbulletinResourcesParams, queryConfig?: UseQueryOptions<GETlightbulletinResources, Error, GETlightbulletinResources, string[]>) {

    return useQuery(['lightbulletinResources', ...getQueryKeysFromParamsObject(params)], async () => {
        const res = await axios.get(GETlightbulletinResourcesApiUrl({
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
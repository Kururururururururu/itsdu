import {useMutation, UseMutationOptions} from "@tanstack/react-query";
import axios from "axios";
import {getQueryKeysFromParamsObject} from "@/lib/utils.ts";
import {PUTlightbulletinNotificationsBody} from "@/api-types/lightbulletin/PUTlightbulletinNotifications.ts";
import {
    PUTcourseFavorite,
    PUTcourseFavoriteApiUrl,
    PUTcourseFavoriteParams
} from "@/api-types/courses/PUTcourseFavorite.ts";

export default function usePUTcourseFavorite(params: PUTcourseFavoriteParams, body: PUTlightbulletinNotificationsBody, queryConfig?: UseMutationOptions<PUTcourseFavorite, Error, PUTcourseFavorite, string[]>) {

    return useMutation(['courseFavorite', ...getQueryKeysFromParamsObject(params)], async () => {
        const res = await axios.put(PUTcourseFavoriteApiUrl({
            ...params
        }), body, {
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
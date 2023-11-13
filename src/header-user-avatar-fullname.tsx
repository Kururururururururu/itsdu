import {Avatar, AvatarFallback, AvatarImage} from './components/ui/avatar'
import {useUser} from '@/hooks/atoms/useUser.ts'

export default function HeaderUserFullnameAvatar() {

    const user = useUser()
    return (
        <div className={"flex flex-row items-center justify-center gap-2"}>
            <Avatar className={"flex-shrink-0 w-8 h-8"}>
                <AvatarImage src={user?.ProfileImageUrl}
                             alt={user?.FullName}
                             className={"object-cover"}
                />
                <AvatarFallback className={"bg-foreground/20 text-sm"}>
                    {user?.FullName.split(" ").map((name) => name[0]).join("").slice(0, 3)}
                </AvatarFallback>
            </Avatar>
            <p className={"text-lg font-semibold line-clamp-1 break-all"}>{user?.FullName}</p>
        </div>
    )
}

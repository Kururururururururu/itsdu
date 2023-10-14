import Splitter, {SplitDirection} from "@devbookhq/splitter";
import {Suspense} from "react";
import LightbulletinsForCourseLoader from "@/components/lightbulletin/lightbulletins-for-course-loader.tsx";
import LightbulletinsForCourse from "@/components/lightbulletin/lightbulletins-for-course.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import Resources from "@/components/resources/resources.tsx";
import {useParams} from "react-router-dom";

export default function CourseIndex() {
    const params = useParams();
    const courseId = Number(params.id)

    return (
        <div className="grid items-start gap-6 px-4 text-sm font-medium h-full">
            <div className={"flex gap-4 flex-1 h-full"}>
                <Splitter direction={SplitDirection.Horizontal} minWidths={[300, 300]}
                          initialSizes={[200, 100]}>
                    <div className={"flex flex-col flex-1 py-2 pr-2"}>
                        <div className={"flex flex-col flex-1 gap-4"}>
                            <h2 className={"text-xl font-bold"}>Announcements</h2>
                            <Suspense
                                fallback={<LightbulletinsForCourseLoader/>}
                            >
                                <LightbulletinsForCourse courseId={courseId}/>
                            </Suspense>

                        </div>
                    </div>
                    <div
                        className={"flex flex-col gap-4 pr-4"}>
                        <h2 className={"text-xl font-bold"}>Resources</h2>

                        <Suspense
                            fallback={<div className={"flex flex-col gap-2 w-full"}>
                                <Skeleton className="h-4 bg-gray-400 rounded"/>
                                <Skeleton className="h-4 bg-gray-400 rounded"/>
                                <Skeleton className="h-4 bg-gray-400 rounded"/>
                                <Skeleton className="h-4 bg-gray-400 rounded"/>
                            </div>}>
                            <Resources courseId={courseId}/>
                        </Suspense>
                    </div>
                </Splitter>
            </div>
        </div>
    )
}
import {apiUrl, baseUrl} from "@/lib/utils.ts";
import ReactDOM from 'react-dom/client'
import '@/index.css'
import {createHashRouter, RouterProvider} from 'react-router-dom'
import Providers from "@/components/providers.tsx";
import axios from "axios";

// const Root = React.lazy(() => import("@/routes/root"));
/*
const ErrorPage = React.lazy(() => import("@/error-page"));
const Contact = React.lazy(() => import("@/routes/contact"));
const Layout = React.lazy(() => import("@/components/layout"));
const Test = React.lazy(() => import("@/routes/test"));
const Test1 = React.lazy(() => import("@/routes/test1"));
const Profile = React.lazy(() => import("@/routes/profile.tsx"));
const Index = React.lazy(() => import("@/routes/index"));
const Course = React.lazy(() => import("@/routes/course"));
const Querytesting = React.lazy(() => import("@/routes/querytesting"));
*/
import ErrorPage from "@/error-page.tsx"
import Contact from "@/routes/contact.tsx"
import Layout from "@/components/layout.tsx"
import Test from "@/routes/test.tsx"
import Test1 from "@/routes/test1.tsx"
import Profile from "@/routes/profile.tsx"
import Index from "@/routes/index.tsx"
import Querytesting from "@/routes/querytesting.tsx"
import Calendar from "@/routes/calendar.tsx"
import SuspenseWrapper from "@/components/suspense-wrapper.tsx";
import Messages from "@/components/messages/messages.tsx";
import Sidebar from "@/routes/sidebar.tsx"
import CourseLayout from "@/components/course/course-layout.tsx";
import CourseIndex from "@/routes/course/course-index.tsx";
import CourseParticipants from "@/routes/course/course-participants.tsx";
import CourseInformation from "@/routes/course/course-information.tsx";
import NotificationsIndex from "./routes/notifications/notifications-index";

const router = createHashRouter([
    {
        element: <Layout/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/",
                element: <Index/>,
                errorElement: <ErrorPage/>,
                index: true,
            },
            {
                path: "/sidebar",
                element: <Sidebar/>,
                errorElement: <ErrorPage/>,
            },
            {
                path: "/notifications",
                element: <SuspenseWrapper><NotificationsIndex/></SuspenseWrapper>,
                errorElement: <ErrorPage/>,
            },
            {
                path: "/calendar",
                element: <SuspenseWrapper><Calendar/></SuspenseWrapper>,
                errorElement: <ErrorPage/>,
            },
            {
                path: "/course/:id",
                element: <SuspenseWrapper><CourseLayout/></SuspenseWrapper>,
                errorElement: <ErrorPage/>,
                children: [
                    {
                        element: <SuspenseWrapper><CourseIndex/></SuspenseWrapper>,
                        index: true,
                        errorElement: <ErrorPage/>,
                    },
                    {
                        path: "resources",
                        element: <SuspenseWrapper>
                            <div>
                                <h1>Resources</h1>
                            </div>
                        </SuspenseWrapper>,
                        errorElement: <ErrorPage/>,
                    },
                    {
                        path: "announcements",
                        element: <SuspenseWrapper>
                            <div>
                                <h1>Announcements</h1>
                            </div>
                        </SuspenseWrapper>,
                    },
                    {
                        path: "course-information",
                        element: <SuspenseWrapper><CourseInformation/></SuspenseWrapper>,
                    },
                    {
                        path: "tasks",
                        element: <SuspenseWrapper>
                            <div>
                                <h1>Tasks</h1>
                            </div>
                        </SuspenseWrapper>,
                    },
                    {
                        path: "participants",
                        element: <SuspenseWrapper>
                            <CourseParticipants/>
                        </SuspenseWrapper>,
                    },
                    {
                        path: "*",
                        element: <ErrorPage/>,
                        errorElement: <ErrorPage/>,
                    }
                ],
            },
            {
                path: "/querytesting",
                element: <Querytesting/>,
                errorElement: <ErrorPage/>,
            },
            {
                path: "/profile",
                element: <SuspenseWrapper><Profile/></SuspenseWrapper>,
                errorElement: <ErrorPage/>,
            },
            {
                path: "/messages",
                element: <SuspenseWrapper><Messages/></SuspenseWrapper>,
                errorElement: <ErrorPage/>,
            },
            {
                path: "/contacts/:id",
                element: <Contact/>,
                errorElement: <ErrorPage/>,
            },
            {
                path: "/test",
                element: <Test/>,
                errorElement: <ErrorPage/>,
            },
            {
                path: "/test1",
                element: <Test1/>,
                errorElement: <ErrorPage/>,
            },
            {
                path: "*",
                element: <ErrorPage/>,
                errorElement: <ErrorPage/>,
            }
        ]
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <SuspenseWrapper>
        <Providers>
            <SuspenseWrapper>
                {/*<React.StrictMode>*/}
                <RouterProvider fallbackElement={<ErrorPage/>} future={{
                    v7_startTransition: true,
                }} router={router}/>
                {/*</React.StrictMode>*/}
            </SuspenseWrapper>
        </Providers>
    </SuspenseWrapper>
)

/*setInterval(async () => {
    const access_token = window.localStorage.getItem('access_token')

    try {
        axios.post(apiUrl('restApi/keepalive/online/v1'), {
            "access_token": access_token
        }, {
            params: {
                "access_token": access_token
            }
        })
    } catch (e) {
        console.log(e)
    }
}, 1000 * 60 * 60) // 1 hour*/  // Disabled because it's not working

setInterval(async () => {
    // refresh token
    const refresh_token = window.localStorage.getItem('refresh_token')
    if (refresh_token) {
        try {
            // @ts-ignore
            const {data} = await axios.post(apiUrl('restapi/oauth2/token'), {
                "grant_type": "refresh_token",
                "refresh_token": refresh_token,
                "client_id": '10ae9d30-1853-48ff-81cb-47b58a325685',
            }, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            })

            console.log(data)
            console.log('refreshed token')
            window.localStorage.setItem('access_token', data.access_token)
            window.localStorage.setItem('refresh_token', data.refresh_token)
            window.location.reload()
        } catch (e) {
            console.log(e)
        }
    }
}, 1000 * 60 * 30) // 30 minutes


// unread messages notification system
type UnreadMessages = {
    count: number
    timestamp: number
}
const unreadMessages: UnreadMessages[] = [
    {
        count: 0,
        timestamp: Date.now()
    }
]
setInterval(() => {
    const access_token = window.localStorage.getItem('access_token')
    axios.get(`${baseUrl}restapi/personal/instantmessages/messagethreads/unread/count/v1`, {
        params: {
            'access_token': access_token
        }
    }).then((res: {
        data: number;
    }) => {
        unreadMessages.push({
            count: res.data,
            timestamp: Date.now()
        })

        if (unreadMessages.length > 10) {
            unreadMessages.shift()
        }

        console.log(unreadMessages)

        // check if there are any unread messages based on the timestamps and the count
        if (unreadMessages[unreadMessages.length - 1].count > 0 && unreadMessages[unreadMessages.length - 1].timestamp - unreadMessages[0].timestamp < 1000 * 60 * 5) {
            if (unreadMessages[unreadMessages.length - 1].count !== unreadMessages[unreadMessages.length - 2].count) {
                new Notification('itslearning', {
                    body: `You have ${unreadMessages[unreadMessages.length - 1].count} unread message${unreadMessages[unreadMessages.length - 1].count > 1 ? 's' : ''}`,
                    icon: 'itsl-itslearning-file://icon.ico'
                })

            }
        }
    }).catch((err: any) => {
        console.log(err)
    })
}, 1000 * 15) // 1 minute

// Remove Preload scripts loading
postMessage({payload: 'removeLoading'}, '*')

// Use contextBridge
window.ipcRenderer.on('main-process-message', (_event, message) => {
    console.log(message)
})

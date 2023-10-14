import {AnimatePresence, motion} from "framer-motion";
import {Button} from "@/components/ui/button.tsx";
import {ChevronUp} from "lucide-react";
import React, {useEffect, useState} from "react";

export default function ScrollToTopButton({viewportRef}: {
    viewportRef: React.RefObject<HTMLDivElement>
}) {

    const [showToTopButton, setShowToTopButton] = useState<boolean>(false)

    useEffect(() => {
        const onScroll = () => {
            if (viewportRef.current) {
                setShowToTopButton(viewportRef.current.scrollTop > 100)
            }
        }
        viewportRef.current?.addEventListener('scroll', onScroll)
        return () => viewportRef.current?.removeEventListener('scroll', onScroll)
    }, [viewportRef])

    return (
        <AnimatePresence>
            {showToTopButton && (
                <motion.div
                    initial={{opacity: 0, y: 100}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: 100}}
                    transition={{duration: 0.2}}
                >
                    <Button
                        variant={"outline"}
                        size={"icon"}
                        className="fixed bottom-4 right-8 z-50 inline-flex items-center justify-center w-12 h-12 text-white transition-all duration-200 rounded-full shadow-md hover:shadow-lg"
                        onClick={() => {
                            viewportRef.current?.scrollTo({
                                top: 0,
                                behavior: "smooth"
                            })
                        }}
                    >
                        <ChevronUp className="w-7 h-7 stroke-foreground"/>
                    </Button>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
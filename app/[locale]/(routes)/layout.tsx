

import Footer from "./components/Footer";
import { Metadata } from "next";
import { ThemeToggle } from "@/components/ThemeToggle";
import SideBar from "./components/SideBar";
import getAllCommits from "@/actions/github/get-repo-commits";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL! || "http://localhost:3000"
  ),
  title: "",
  description: "",
  openGraph: {
    images: [
      {
        url: "/images/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      {
        url: "/images/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "",
      },
    ],
  },
};
export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const build = await getAllCommits();
  //console.log(typeof build, "build");
  return (
    <div className="flex flex-col justify-center items-center h-screen w-full">
      <SideBar build={build} />
      <div className="flex justify-end items-center space-x-5 w-full p-5">
        <ThemeToggle />
      </div>
      <div className="flex items-center h-full overflow-hidden">{children}</div>
      <Footer />
    </div>

    // <div className="flex h-screen overflow-hidden">
    //   <SideBar build={build} />
    //   <div className="flex flex-col h-full w-full overflow-hidden">
    //     <Header
    //       id={session.user.id as string}
    //       name={session.user.name as string}
    //       email={session.user.email as string}
    //       avatar={session.user.image as string}
    //       lang={session.user.userLanguage as string}
    //     />
    //     <div className="flex-grow overflow-y-auto h-full p-5">{children}</div>
    //     <Footer />
    //   </div>
    // </div>
  );
}

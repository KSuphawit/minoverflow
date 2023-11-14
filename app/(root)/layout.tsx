import Navbar from "@/components/shared/navbar/Navbar";
import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="background-light850_dark100 relative">
      <Navbar />
      <div className="flex">
        LeftSidebar
        <section className="max-md:pb-14sm:px-14 flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>
        RightSideBar
      </div>
      Toaster
    </main>
  );
}

export default Layout;

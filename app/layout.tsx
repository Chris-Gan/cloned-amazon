import { getServerSession } from "next-auth";
import Header from "../components/Header/Header";
import SessionProvider from "../components/SessionProvider";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import "../styles/globals.css";
import { CustomProvider } from "./GlobalRedux/Provider";

export const metadata = {
  title: "Amazon clone",
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html>
      <head />
      <body className="bg-gray-100">
        <SessionProvider session={session}>
          <CustomProvider>
            <Header />
            {children}
          </CustomProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

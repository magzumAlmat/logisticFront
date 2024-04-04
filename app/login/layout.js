import { Inter } from "next/font/google";
import "../(root)/globals.css";
import styles from "./login.module.css";
import ReduxProvider from "../../providers/ReduxProvider";

export const metadata = {
  title: "Вход",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          {" "}
          <main className={styles.main}>{children}</main>
        </ReduxProvider>
      </body>
    </html>
  );
}

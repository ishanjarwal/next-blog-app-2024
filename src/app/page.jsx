import styles from "./homepage.module.css";
import Featured from "@/components/featured/Featured";
import CardList from "@/components/cardList/CardList";
import Menu from "@/components/menu/Menu";
import CategoryList from "@/components/categoryList/CategoryList";
import axios from "axios";
import { redirect } from "next/navigation";

const getData = async (page, category = "") => {
  try {
    const res = await axios.get(`http://localhost:3000/api/posts?page=${page}&category=${category}`, { headers: { cache: "no-store" } });
    if (res.status != 200 || res.data?.count <= 0) {
      return { redirector: "/error" }
    }
    return res.data;
  } catch (error) {
    return { redirector: "/error" }
  }
}


export default async function Home({ searchParams }) {
  const page = parseInt(searchParams?.page) || 1;
  const { posts, count, POST_PER_PAGE, redirector } = await getData(page, "");
  if (redirector) {
    redirect(redirector);
  }
  return (
    <div className={styles.container}>
      <Featured />
      <div style={styles.content}>
        <CategoryList />
        <div className={styles.main} id="main">
          <CardList posts={posts} count={count} page={page} />
          <Menu />
        </div>
      </div>
    </div>
  )
}

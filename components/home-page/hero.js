import Image from "next/image";
import classes from "./hero.module.css";

export default function Hero() {
    return (
        <section className={classes.hero}>
            <div className={classes.image}>
                <Image
                    src="/images/site/photo24.jpg"
                    alt="Image showing Imran"
                    width={300}
                    height={300}
                ></Image>
            </div>
            <h1>Hi, I'm Imran</h1>
            <p>
                I blog about web development - especially frontend frameworks
                like Angular and React
            </p>
        </section>
    );
}

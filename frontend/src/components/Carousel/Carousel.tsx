import { ReactElement, useState } from "react";
import styles from "./Carousel.module.css";

type CarouselProps = {
  elements: ReactElement[];
};

export default function Carousel({ elements }: CarouselProps) {
  const [currentElement, setCurrentElement] = useState(0);

  function prevElement() {
    setCurrentElement(currentElement - 1);
  }

  function nextElement() {
    setCurrentElement(currentElement + 1);
  }

  if (elements.length > 0)
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <button
            className={`${styles.button} ${styles.prev}`}
            onClick={prevElement}
            disabled={elements.length <= 1 || currentElement === 0}
          >
            <svg className={styles.arrow} viewBox="0 0 24 24">
              <path d="M15 18L9 12L15 6" />
            </svg>
          </button>
          {elements[currentElement]}
          <button
            className={`${styles.button} ${styles.next}`}
            onClick={nextElement}
            disabled={
              elements.length <= 1 || currentElement === elements.length - 1
            }
          >
            <svg className={styles.arrow} viewBox="0 0 24 24">
              <path d="M9 18L15 12L9 6" />
            </svg>
          </button>
        </div>
      </div>
    );

  return <></>;
}

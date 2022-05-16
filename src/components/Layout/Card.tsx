import classes from "./Card.module.css";

type CardProps = {
  children: React.ReactNode;
};

const Card = (props: CardProps) => {
  return (
    <div className={classes.card}>
      <div className={classes.cardContent}>{props.children}</div>
    </div>
  );
};

export default Card;

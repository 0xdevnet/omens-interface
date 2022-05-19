import mainImage from "../../../../assets/images/mainImage.png";
import omenImage from "../../../../assets/images/OMENS.svg";
import bottomImage from "../../../../assets/images/bottomImage.svg";
import Style from "./digsites.module.scss";

const Digsites = () => {
  return (
    <>
      
      <div className={`${Style.bottomContainer} `}>
        <div className={Style.textContainer}>
          <p className={Style.text}>
            "HELL IS JUST A FRAME OF MIND."
            <br />
            -CHRISTOPHER MARLOWE
          </p>
        </div>
      </div>
    </>
  );
};
export default Digsites;

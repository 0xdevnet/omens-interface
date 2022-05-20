import backgroundVideo from "../../../../assets/videos/ticketreal.mp4";
import Style from "./tickets.module.scss";
import Button from "@mui/material/Button";
import { useState } from "react";

const Tickets = () => {
  const [currentActive, setCurrentActive] = useState(0);

  const handleRouting = (index) => {
    if (index > 2) return;
    setCurrentActive(index);
    console.log(index);
  };
  return (
    <>
      <video autoPlay loop muted id="video" className={Style.video}>
        <source src={backgroundVideo} type="video/mp4" />
      </video>
      <div className={`${Style.mainContainer}  `}>
        <div className={Style.header}>
          <p className={Style.title}>
            ENTER
            <br />
            THE UNDERWORLD
          </p>
        </div>
        {currentActive == 1 ? (
          <div className={Style.body}>
            <p className={Style.paragraph}>
              YOU HAVE BEEN ADMITTED TO THE UNDERWORLD.
            </p>
            <p className={Style.paragraph}>
              YOUR WALLET (wallet address) HAS BEEN ALLOCATEDONE OMENS WHITELIST
              SPOT
            </p>
            <p className={Style.paragraph}>YOU NOW HAVE (X) SPOTS</p>
          </div>
        ) : (
          <div className={Style.body}>
            <p className={Style.paragraph}>
              REDEEM YOUR OMENS UNDERWORLD TICKET FOR ONE WALLET LOCKED
              WHITELIST SPOT
            </p>
            <p className={Style.paragraph}>
              YOU MAY STACK UP TO 5 TICKETS TOTAL
            </p>
            <p className={Style.paragraph}>GOOD LUCK.</p>
            <p className={Style.paragraph}>
              YOUR WALLET CURRENTLY HAS: (X)SPOTS LOCKED
            </p>
          </div>
        )}

        <div className={Style.footer}>
          <Button
            onClick={() => handleRouting(currentActive + 1)}
            sx={{ color: "#E38E74", display: "block" }}
            className={Style.btn1}
          >
            {currentActive == 0
              ? "REDEEM YOUR TICKET"
              : currentActive == 1
              ? "REDEEMED!"
              : "COME BACK WHEN YOU HAVE A TICKET"}
          </Button>
        </div>
      </div>
    </>
  );
};
export default Tickets;

import mainImage from '../../../../assets/images/mainImage.svg';
import bottomImage from '../../../../assets/images/bottomImage.svg';
import Style from './digsites.module.scss';

const Digsites = () => {
    return (
        <>
            <div className={`${Style.mainContainer}  `}>
                <img className={Style.image} src={mainImage} />
                <div className='mt-5'>

                    <p>
                        BAD OMENS. GOOD OMENS. LIFE IS FULL OF THEM.
                        PERHAPS, YOU COULD CONTROL THESE OMENS?
                        INFLUENCE THE FATE OF YOURSELF? OTHERS? THE WORLD?

                    </p>
                    <p>
                        TAKE CONTROL. UNLEASH YOUR INNER BEAST.
                        NO ONE SHOULD BRAVE THE UNDERWORLD ALONE.
                    </p>
                </div>


            </div>
            <div className={`${Style.bottomContainer} `}>
                <img src={bottomImage} />
                <div className={Style.textContainer}>
                    <p className={Style.text}>
                        "HELL IS JUST A FRAME OF MIND.<br />
                        -CHRISTOPHER MARLOWE
                    </p>
                </div>
            </div>
        </>
    )
}
export default Digsites;
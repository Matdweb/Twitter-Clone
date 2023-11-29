import TwitterSearcher from "./TwitterSearcher";
import PopularTrends from "./PopularTrends";
import WhoToFollow from "./WhoToFollow";
import Footer from "./Footer";

function PopularTrendsSection() {
    return (
        <section className='max-w-[26rem] w-1/3 max-h-screen min-h-screen p-1 m-1 shrink flex justify-start items-start flex-col flex-nowrap overflow-y-scroll'>
            <TwitterSearcher />
            <div className='w-full px-7 flex justify-center items-stretch flex-col'>
                <PopularTrends />
                <WhoToFollow />
                <Footer />
            </div>
        </section>
    )
}

export default PopularTrendsSection;
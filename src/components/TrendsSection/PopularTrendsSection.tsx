import TwitterSearcher from "./TwitterSearcher";
import PopularTrends from "./PopularTrends";
import WhoToFollow from "./WhoToFollow";
import Footer from "./Footer";

function PopularTrendsSection() {

    return (
        <section className='w-1/3 min-h-screen outline outline-2 rounded-md p-1 m-1 shrink flex justify-start items-start flex-col flex-nowrap'>
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
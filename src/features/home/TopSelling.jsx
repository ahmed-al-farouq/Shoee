import React from "react";
import { Link } from "react-router-dom";
// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Pagination, Navigation } from "swiper/modules";
// Icons
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { fetchProduct } from "../../app/features/products/productsSlice";

SwiperCore.use([Pagination, Navigation]);
const TopSelling = () => {
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();
  const items = [];
 

  for (let i = 0; i < products.length; i++) {
    items.push(
      <SwiperSlide tag="li" key={products[i].id}>
        <Link
          to="/singleproduct"
          key={"item_" + products[i].id}
          onClick={() => dispatch(fetchProduct(products[i].id))}
        >
          <div className="item">
            <div className="image-container">
              <img src={products[i].image} alt={products[i].title} />
            </div>
            <div className="content">
              <h2>{products[i].title}</h2>
              {/* <h3 className="brand">brand: {products[i].playable_platform}</h3> */}
              <span className="price">${products[i].price}</span>
              {/* <span className="old_price">${products[i].oldPrice}</span> */}
              <div className="stars">
                {Array.from({ length: 5 }, (_, index) => {
                  return (
                    <span key={index}>
                      {products[i].stars >= index + 1 ? (
                        <BsStarFill />
                      ) : products[i].stars >= index + 0.5 ? (
                        <BsStarHalf />
                      ) : (
                        <BsStar />
                      )}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </Link>
      </SwiperSlide>
    );
  }
  return (
    <section className="top-selling">
      <h2 className="title">Top Selling</h2>
      {window.innerWidth <= "767.99" ? (
        <Swiper
          tag="section"
          className="top-selling-slider small-screen"
          wrapperTag="ul"
          slidesPerView={1}
          pagination
          navigation
        >
          {items}
        </Swiper>
      ) : (
        <Swiper
          tag="section"
          className="top-selling-slider"
          wrapperTag="ul"
          slidesPerView={3}
          pagination
          navigation
        >
          {items}
        </Swiper>
      )}
    </section>
  );
};

export default TopSelling;

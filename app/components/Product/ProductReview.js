"use client";

import React, { useEffect } from 'react';

const ProductReview = ({ productid, price, currency, name, url, imageurl }) => {
  useEffect(function mount() {
    // const pathArray = window.location.pathname.split('/');
    // update Yotpo dynamically
    //console.log('in useEffect');
    if (window.yotpo) {
      window.yotpo.initialized = false;
      window.yotpo.clean();

      // there is a widgets array that the widgets are pulling data from; we need to update this
      for (let i = 0, len = window.yotpo.widgets.length; i < len; i++) {
        // console.log('refreshing yotpo', window.yotpo.widgets[i].settings.pid);
        window.yotpo.widgets[i].settings.pid = productid;
        window.yotpo.widgets[i].settings.main_widget_pid = productid;
        // console.log('new value', window.yotpo.widgets[i].settings.pid);
      }

      setTimeout(() => {
        window.yotpo.initWidgets();
      }, 500);
    } else {
      // console.log('initializing and refreshing yotpo');
      const recaptchaScript = document.createElement('script');
      recaptchaScript.setAttribute(
        'src',
        '//staticw2.yotpo.com/aYi6vxBOV00VyVRIlsqsQa0nA2jAi07rWQILkcLO/widget.js'
      );
      document.head.appendChild(recaptchaScript);
    }
  });

  return (
    <div
      className="yotpo yotpo-main-widget"
      data-product-id={productid}
      data-price={price}
      data-currency={currency}
      data-name={name}
      data-url={url}
      data-image-url={imageurl}
    ></div>
  );
};

export default ProductReview;

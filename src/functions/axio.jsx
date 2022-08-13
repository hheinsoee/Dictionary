import axios from 'axios';
import React, { useEffect, useState } from 'react';

function useMyAjax(props) {
  const [respond, setRespond] = useState(null);
  useEffect(() => {
    axios.get(props.endpoint, {
      params: props.params
    })
      .then(function (response) {
        setRespond(response);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, []);
  return respond;
}

export default useMyAjax;
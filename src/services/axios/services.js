import axios from "axios";

export const search_group = (data) => {
  return axios
    .get(
      `https://www.flickr.com/services/rest/?method=flickr.groups.search&api_key=${data.api_key}&text=${data.value}&per_page=${data.per_page}&page=${data.page}&format=json&nojsoncallback=1`
    )
    .then((res) => {
      // console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const group_info = (data) => {
  return axios
    .get(
      `https://www.flickr.com/services/rest/?method=flickr.groups.getInfo&api_key=${data.api_key}&group_id=${data.group_id}&format=json&nojsoncallback=1`
    )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const gallery_data = (data) => {
  return axios.get(
    `https://www.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=${data.api_key}&group_id=${data.group_id}&per_page=${data.per_page}&page=${data.page}&format=json&nojsoncallback=1`
  );
};

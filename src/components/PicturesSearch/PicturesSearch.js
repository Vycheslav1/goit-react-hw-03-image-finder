import React, { Component } from 'react';

import Notiflix from 'notiflix';

import { Searchbar } from 'components/Searchbar/Searchbar.js';

import { Button } from 'components/Button/Button.js';

import { Modal } from 'components/Modal/Modal.js';

import { Div } from './PicturesSearchStyles.js';

import { ImageGallery } from 'components/ImageGallery/ImageGallery.js';

import { Loader } from 'components/Loader/Loader.js';

import { getPicturesGallery } from 'api/search.js';

let isLoading;

let largeImageURL;

let tags;

class PicturesSearch extends Component {
  state = {
    pictures: [],
    q: '',
    page: 1,
    show: false,
    showButton: false,
  };
  isLoading = false;

  componentDidUpdate(prevProps, prevState) {
    if (this.state.q !== prevState.q || this.state.page !== prevState.page) {
      getPicturesGallery(this.state.q, this.state.page)
        .then(response => {
          if (response.data.totalHits === 0) {
            Notiflix.Notify.info(
              'Sorry, there are no images matching your search query. Please try again.'
            );
          }
          let pictureLength = response.data.totalHits;
          let pageNumber = this.state.page;

          this.setState({
            pictures: [...prevState.pictures, ...response.data.hits],
            maxLength: response.data.totalHits,
            showButton: pageNumber < Math.ceil(pictureLength / 12),
          });
          isLoading = false;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  handleSubmit = evt => {
    evt.preventDefault();
    this.setState(prev => ({
      pictures: prev.pictures.splice(0, prev.pictures.length),
      q: evt.target[1].value.trim(),
      page: 1,
      showButton: false,
    }));
    isLoading = true;
  };

  handleChangePage = () => {
    this.setState(prev => ({
      page: prev.page + 1,
      showButton: false,
    }));
    isLoading = true;
  };

  handleModalView = e => {
    if (e.key === 'Escape') {
      this.setState({
        show: false,
      });
    }
  };

  showModal = e => {
    this.setState({
      show: true,
    });

    document.addEventListener('keydown', this.handleModalView);

    largeImageURL = this.state.pictures.find(
      picture => picture.webformatURL === e.target.src
    ).largeImageURL;

    tags = this.state.pictures.find(
      picture => picture.webformatURL === e.target.src
    ).tags;
  };
  showOverlay = () => {
    this.setState({
      show: false,
    });
    document.removeEventListener('keydown', this.handleModalView);
  };

  render() {
    return (
      <Div>
        <Searchbar valueSubmit={this.handleSubmit} />
        {!isLoading ? (
          <ImageGallery
            viewModal={this.showModal}
            photos={this.state.pictures}
          />
        ) : (
          <Loader />
        )}
        {this.state.showButton && <Button changePage={this.handleChangePage} />}
        {this.state.show && (
          <Modal
            hideModal={this.showOverlay}
            largeImageURL={largeImageURL}
            title={tags}
          />
        )}
      </Div>
    );
  }
}
export { PicturesSearch };

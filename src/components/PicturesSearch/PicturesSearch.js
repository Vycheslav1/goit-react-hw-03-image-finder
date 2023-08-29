import React, { Component } from 'react';

import Notiflix from 'notiflix';

import { Searchbar } from 'components/Searchbar/Searchbar.js';

import { Button } from 'components/Button/Button.js';

import { Modal } from 'components/Modal/Modal.js';

import { Div } from './PicturesSearchStyles.js';

import { ImageGallery } from 'components/ImageGallery/ImageGallery.js';

import { Loader } from 'components/Loader/Loader.js';

import { getPicturesGallery } from 'api/search.js';

class PicturesSearch extends Component {
  state = {
    pictures: [],
    q: '',
    page: 1,
    show: false,
    isLoading: false,
    showButton: false,
    maxLength: 0,
  };
  items = this.state;

  componentDidUpdate(prevProps, prevState) {
    if (this.state.q !== prevState.q || this.state.page !== prevState.page) {
      getPicturesGallery(this.state.q, this.state.page)
        .then(response => {
          this.items.pictures = [...this.items.pictures, ...response.data.hits];

          if (response.data.totalHits === 0) {
            Notiflix.Notify.info(
              'Sorry, there are no images matching your search query. Please try again.'
            );
          }
          this.items.maxLength = response.data.totalHits;

          this.setState({
            pictures: this.items.pictures,
            isLoading: false,
            showButton: this.items.page < Math.ceil(this.items.maxLength / 12),
            maxLength: this.items.maxLength,
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  handleSubmit = evt => {
    evt.preventDefault();
    this.setState({
      pictures: [],
      q: evt.target[1].value.trim(),
      isLoading: true,
      showButton: false,
    });

    this.items.pictures = [];
    this.items.page = 1;
  };

  handleChangePage = () => {
    this.setState(prev => ({
      page: prev.page + 1,
      isLoading: true,
      showButton: false,
    }));
    this.items.page += 1;
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

    this.items.largeImageURL = this.state.pictures.find(
      picture => picture.webformatURL === e.target.src
    ).largeImageURL;

    this.items.tags = this.state.pictures.find(
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
        {!this.state.isLoading ? (
          <ImageGallery
            viewModal={this.showModal}
            photos={this.items.pictures}
          />
        ) : (
          <Loader />
        )}
        {this.state.showButton && <Button changePage={this.handleChangePage} />}
        {this.state.show && (
          <Modal
            hideModal={this.showOverlay}
            largeImageURL={this.items.largeImageURL}
            title={this.items.tags}
          />
        )}
      </Div>
    );
  }
}
export { PicturesSearch };

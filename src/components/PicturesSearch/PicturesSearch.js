import React, { Component } from 'react';

import Notiflix from 'notiflix';

import { Searchbar } from 'components/Searchbar/Searchbar.js';

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
    per_page: 12,
    show: false,
    isLoading: false,
    showButton: false,
  };
  items = this.state;
  maxLength = 0;
  maxPages = 0;

  componentDidUpdate(prevProps, prevState) {
    if (this.state.q !== prevState.q || this.state.page !== prevState.page) {
      this.items.q = this.state.q;

      getPicturesGallery(this.items)
        .then(response => {
          this.items.pictures = [...this.items.pictures, ...response.data.hits];
          this.maxLength = response.data.totalHits;
          this.maxPages = Math.floor(
            response.data.totalHits / this.state.per_page
          );

          if (response.data.totalHits === 0) {
            Notiflix.Notify.info(
              'Sorry, there are no images matching your search query. Please try again.'
            );
          }

          this.setState({
            pictures: this.items.pictures,
            isLoading: false,
            showButton: true,
          });

          this.items.showButton = true;
          if (this.items.pictures.length >= this.maxLength) {
            this.setState({
              showButton: false,
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  handlSubmit = (evt, id) => {
    evt.preventDefault();
    this.setState({
      pictures: [],
      q: document.getElementById(id).value.trim(),
      page: 1,
      per_page: 12,
      isLoading: true,
      showButton: false,
    });

    this.items.pictures = [];
    this.items.per_page = 12;
    this.items.page = 1;
  };

  handleChangePage = evt => {
    this.setState({
      page: (this.items.page += 1),
      isLoading: true,
      showButton: false,
    });
    if (this.items.page > this.maxPages) {
      this.maxLength % this.state.per_page < 3
        ? (this.items.per_page = 12)
        : (this.items.per_page = this.maxLength % this.state.per_page);
      this.setState({
        per_page: this.items.per_page,
      });
    }
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
        <Searchbar valueSubmit={this.handlSubmit} />
        {!this.state.isLoading ? (
          <ImageGallery
            changePageNumber={this.handleChangePage}
            viewButton={this.state.showButton}
            viewModal={this.showModal}
            photos={this.items.pictures}
          />
        ) : (
          <Loader />
        )}

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

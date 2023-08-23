import React, { Component } from 'react';

import Notiflix from 'notiflix';

import { Searchbar } from 'components/Searchbar/Searchbar.js';

import { Button } from 'components/Button/Button.js';

import { Modal } from 'components/Modal/Modal.js';

import { Div } from './PicturesSearchStyles.js';

import { ImageGallery } from 'components/ImageGallery/ImageGallery.js';

import { Loader } from 'components/Loader/Loader.js';

import { getPicturesGallery } from './search.js';

class PicturesSearch extends Component {
  state = {
    pictures: [],
    q: '',
    page: 1,
    key: '38043357-f10dc93754f8f78d0f9509fe0',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
    show: false,
    isLoading: false,
  };
  items = this.state;

  maxLength = 0;

  componentDidUpdate(prevProps, prevState) {
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        this.setState({
          show: false,
        });
      }
    });
    if (this.state.q !== prevState.q) {
      this.setState({
        isLoading: true,
      });

      this.setState({
        pictures: this.items.pictures.splice(0, this.items.pictures.length),
        page: 1,
      });

      this.items.pictures = this.state.pictures;

      this.items.page = 1;

      this.items.q = this.state.q;

      getPicturesGallery(this.items, this.showLoader)
        .then(response => {
          this.maxLength = response.data.totalHits;
          if (response.data.totalHits === 0) {
            Notiflix.Notify.info(
              'Sorry, there are no images matching your search query. Please try again.'
            );
          }

          this.setState({
            pictures: this.items.pictures.splice(0, 0, ...response.data.hits),
          });
        })
        .catch(error => {
          console.log(error);
        });
      this.setState({
        isLoading: false,
      });
    }
    if (!Math.floor(1 / this.state.page)) {
      if (this.state.page !== prevState.page) {
        this.setState({
          isLoading: true,
        });
        getPicturesGallery(this.items, this.showLoader)
          .then(response => {
            this.setState({
              pictures: this.items.pictures.splice(
                this.items.pictures.length,
                0,
                ...response.data.hits
              ),
            });
          })
          .catch(error => {
            console.log(error);
          });
        this.setState({
          isLoading: false,
        });
      }
    }

    this.showLoader = 1;
  }
  handlSubmit = (evt, id) => {
    evt.preventDefault();
    this.setState({
      q: document.getElementById(id).value.trim(),
    });
  };

  handleChangePage = evt => {
    this.setState({
      page: (this.items.page += 1),
    });
  };

  showModal = e => {
    this.setState({
      show: true,
    });

    this.items.largeImageURL = this.items.pictures.find(
      picture => picture.webformatURL === e.target.src
    ).largeImageURL;

    this.items.tags = this.items.pictures.find(
      picture => picture.webformatURL === e.target.src
    ).tags;
  };

  showOverlay = () => {
    this.setState({
      show: false,
    });
  };

  render() {
    return this.state.show ? (
      <Modal
        hideModal={this.showOverlay}
        largeImageURL={this.items.largeImageURL}
        title={this.items.tags}
      />
    ) : (
      <Div>
        <Searchbar valueSubmit={this.handlSubmit} />
        {!this.state.isLoading ? (
          <ImageGallery
            viewModal={this.showModal}
            photos={this.items.pictures}
            max={this.maxLength}
          />
        ) : (
          <Loader />
        )}
        {this.items.pictures.length > 0 &&
          this.items.pictures.length < this.maxLength && (
            <Button changePage={this.handleChangePage} />
          )}
      </Div>
    );
  }
}
export { PicturesSearch };

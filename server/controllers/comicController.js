const axios = require('axios');
const { User, History, Comic, Favorite, Donate } = require('../models/index')
const midtransClient = require('midtrans-client')

class comicController {
    static async fetchComicsDetail(req, res, next) {
        const {slug} = req.params
        const options = {
            method: 'GET',
            url: `https://manga-scrapper.p.rapidapi.com/chapters?provider=cosmic&webtoon=${slug}`,
            headers: {
              'X-RapidAPI-Key': '14c903c4aamsh59ef1e9586e2a73p153826jsn102acfedc3b8',
              'X-RapidAPI-Host': 'manga-scrapper.p.rapidapi.com'
            }
          };
        try {
            const response = await axios.request(options);
            const data = response.data;

            const page = req.query.page ? parseInt(req.query.page) : 1;
            const perPage = 1;
            const totalItems = 9;
            const totalPages = Math.ceil(totalItems / perPage);
        
            if (page > totalPages) throw { name: "NOT_FOUND" };
        
            const start = (page - 1) * perPage;
            const end = start + perPage;
            const slicedData = data.slice(start, end);

            const createHistory = await History.create({
                title: `${slicedData[0].fullTitle}`
            })
            res.status(200).json({
                totalItems: totalItems,
                page: page,
                perPage: perPage,
                totalPages: totalPages,
                data: slicedData[0],
            });
          
        } catch (err) {
          console.error(err);
          throw err;
        }
      }
    
      static async fetchComics (req, res, next) {
        try {
            const comics = await Comic.findAll({
              attributes: {
                exclude: ['createdAt', 'updatedAt'],
              }
            })
            res.status(200).json(comics)
        } catch (err) {
            next(err)
        }
      }
      static async midTrans (req, res, next) {
        try {
          const {amount} = req.body
          const donate = await Donate.create({
            amount
          })
          const findUser = await User.findByPk(req.additionalData.id);
            let snap = new midtransClient.Snap({
              isProduction: false,
              serverKey: process.env.CLIENT_MIDTRANS,
            });
            let parameter = {
              transaction_details: {
                order_id:
                  "TRANSACTION_" + Math.floor(1000 + Math.random() * 1000000), //ahrus unique
                gross_amount: donate.amount,
              },
              credit_card: {
                secure: true,
              },
              customer_details: {
                email: findUser.email,
              },
            };

            
            const midtrans_token = await snap.createTransaction(parameter);
            res.status(201).json(midtrans_token);
        } catch (err) {
          next(err)
        }
      }
      static async addFavorite (req, res, next) {
        try {
          const {id} = req.params
          const comics = await Comic.findByPk(id)
          if (!comics) {
            throw { name: 'NOT_FOUND' };
          }
          const favorite = await Favorite.create(
            {
              UserId: req.additionalData.id,
              ComicId: comics.id,
            }
          );
          res.status(201).json({
            id: favorite.id,
            UserId: favorite.UserId,
            ComicId: favorite.ComicId,
          });
        } catch (err) {
          next(err)
          console.log(err);
        }
      }
      static async fetchFavorite(req, res, next) {
        try {
          const fav = await Favorite.findAll({
            attributes: {
              exclude: ['createdAt', 'updatedAt'],
            },
            include: {
              model: Comic,
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'id']
              }
            }
          });
          res.status(200).json(
            fav
          );
        } catch (err) {
          next(err);
        }
      }
}
module.exports = comicController;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BEL;
using DAL;

namespace BLL
{
    public class ReviewsService
    {

        public static List<ReviewsModel>GetAll()
        {
            var config = new MapperConfiguration(cfg => cfg.CreateMap<PReview, ReviewsModel>());
            var mapper = new Mapper(config);
            var data = mapper.Map<List<ReviewsModel>>(DataAccessFactory.PReviewDataAccess().GetAll());
            return data;
        }
       

        

        public static void Delete(int id)
        {
            DataAccessFactory.PReviewDataAccess().Delete(id);
        }

        public static void Add(ReviewsModel e)
        {
            var data = new Mapper(new MapperConfiguration(cfg => cfg.CreateMap< ReviewsModel, PReview>())).Map<PReview>(e);
            DataAccessFactory.PReviewDataAccess().Add(data);
        }
        public static void Edit(ReviewsModel e)
        {
            var data = new Mapper(new MapperConfiguration(cfg => cfg.CreateMap<ReviewsModel,PReview>())).Map<PReview>(e);
            DataAccessFactory.PReviewDataAccess().Edit(data);
        }
        public static ReviewsModel Get(int id)
        {
            var config = new MapperConfiguration(cfg => cfg.CreateMap<PReview, ReviewsModel>());
            var mapper = new Mapper(config);
            var data = mapper.Map<ReviewsModel>(DataAccessFactory.PReviewDataAccess().Get(id));
            return data;
        }

    }
}

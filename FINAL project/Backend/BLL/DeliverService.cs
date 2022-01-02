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
    public class DeliverService
    {

        public static List<DeliverModel>GetAll()
        {
            var config = new MapperConfiguration(cfg => cfg.CreateMap<Deliveryman, DeliverModel>());
            var mapper = new Mapper(config);
            var data = mapper.Map<List<DeliverModel>>(DataAccessFactory.DeliverDataAccess().GetAll());
            return data;
        }
       

        public static List<String>GetNames()
        {

            var data = DataAccessFactory.DeliverDataAccess().GetAll().Select(emp => emp.DName).ToList();
            return data;

        }

        public static void Delete(int id)
        {
            DataAccessFactory.DeliverDataAccess().Delete(id);
        }

        public static void Add(DeliverModel e)
        {
            var data = new Mapper(new MapperConfiguration(cfg => cfg.CreateMap<DeliverModel, Deliveryman>())).Map<Deliveryman>(e);
            DataAccessFactory.DeliverDataAccess().Add(data);
        }
        public static void Edit(DeliverModel e)
        {
            var data = new Mapper(new MapperConfiguration(cfg => cfg.CreateMap<DeliverModel, Deliveryman>())).Map<Deliveryman>(e);
            DataAccessFactory.DeliverDataAccess().Edit(data);
        }
        public static DeliverModel Get(int id)
        {
            var config = new MapperConfiguration(cfg => cfg.CreateMap<Deliveryman, DeliverModel>());
            var mapper = new Mapper(config);
            var data = mapper.Map<DeliverModel>(DataAccessFactory.DeliverDataAccess().Get(id));
            return data;
        }

    }
}

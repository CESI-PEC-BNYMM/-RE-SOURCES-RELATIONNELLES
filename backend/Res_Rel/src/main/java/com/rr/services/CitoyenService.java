package com.rr.services;

import com.rr.entity.Publication;
import org.springframework.beans.factory.annotation.Autowired;

import com.rr.entity.Citoyen;
import com.rr.repository.CitoyenRepository;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.FluentQuery;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;

public class CitoyenService {

    @Autowired
    CitoyenRepository utilisateurRepository;
  /*  private CitoyenRepository utilisateurRepository = new CitoyenRepository() {
        @Override
        public Optional<Citoyen> findByMail(String mail) {
            return Optional.empty();
        }

        @Override
        public Optional<Citoyen> getallpub(List<Publication> pub) {
            return Optional.empty();
        }

        @Override
        public void flush() {

        }

        @Override
        public <S extends Citoyen> S saveAndFlush(S entity) {
            return null;
        }

        @Override
        public <S extends Citoyen> List<S> saveAllAndFlush(Iterable<S> entities) {
            return List.of();
        }

        @Override
        public void deleteAllInBatch(Iterable<Citoyen> entities) {

        }

        @Override
        public void deleteAllByIdInBatch(Iterable<String> strings) {

        }

        @Override
        public void deleteAllInBatch() {

        }

        @Override
        public Citoyen getOne(String s) {
            return null;
        }

        @Override
        public Citoyen getById(String s) {
            return null;
        }

        @Override
        public Citoyen getReferenceById(String s) {
            return null;
        }

        @Override
        public <S extends Citoyen> List<S> findAll(Example<S> example) {
            return List.of();
        }

        @Override
        public <S extends Citoyen> List<S> findAll(Example<S> example, Sort sort) {
            return List.of();
        }

        @Override
        public <S extends Citoyen> List<S> saveAll(Iterable<S> entities) {
            return List.of();
        }

        @Override
        public List<Citoyen> findAll() {
            return List.of();
        }

        @Override
        public List<Citoyen> findAllById(Iterable<String> strings) {
            return List.of();
        }

        @Override
        public <S extends Citoyen> S save(S entity) {
            return null;
        }

        @Override
        public Optional<Citoyen> findById(String s) {
            return Optional.empty();
        }

        @Override
        public boolean existsById(String s) {
            return false;
        }

        @Override
        public long count() {
            return 0;
        }

        @Override
        public void deleteById(String s) {

        }

        @Override
        public void delete(Citoyen entity) {

        }

        @Override
        public void deleteAllById(Iterable<? extends String> strings) {

        }

        @Override
        public void deleteAll(Iterable<? extends Citoyen> entities) {

        }

        @Override
        public void deleteAll() {

        }

        @Override
        public List<Citoyen> findAll(Sort sort) {
            return List.of();
        }

        @Override
        public Page<Citoyen> findAll(Pageable pageable) {
            return null;
        }

        @Override
        public <S extends Citoyen> Optional<S> findOne(Example<S> example) {
            return Optional.empty();
        }

        @Override
        public <S extends Citoyen> Page<S> findAll(Example<S> example, Pageable pageable) {
            return null;
        }

        @Override
        public <S extends Citoyen> long count(Example<S> example) {
            return 0;
        }

        @Override
        public <S extends Citoyen> boolean exists(Example<S> example) {
            return false;
        }

        @Override
        public <S extends Citoyen, R> R findBy(Example<S> example, Function<FluentQuery.FetchableFluentQuery<S>, R> queryFunction) {
            return null;
        }
    };*/

    public CitoyenService (CitoyenRepository citoyenRepository){
        this.utilisateurRepository = citoyenRepository;
    }
    public CitoyenService(){}

    public Citoyen save(Citoyen citoyen) {

        return utilisateurRepository.save(citoyen);
    }

    public Citoyen findbymail(String emailcitoyen){

        return findbymail(emailcitoyen);
    }

    public List<Citoyen> findAll(){
        return utilisateurRepository.findAll();
    }

    public boolean removeCitoyen(Citoyen citoyen){
        utilisateurRepository.deleteByMail(citoyen.getMail());
    }
}
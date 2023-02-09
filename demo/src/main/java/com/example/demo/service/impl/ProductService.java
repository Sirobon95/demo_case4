package com.example.demo.service.impl;

import com.example.demo.model.Product;
import com.example.demo.repository.ProductRepository;
import com.example.demo.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class ProductService implements IProductService {
    @Autowired
    ProductRepository service;


    @Override
    public Optional<Product> findById(Long aLong) {
        return service.findById(aLong);
    }

    @Override
    public List<Product> findAll() {
        return service.findAll();
    }

    @Override
    public Product save(Product category) {
        return service.save(category);
    }

    @Override
    public void deleteById(Long aLong) {
        service.deleteById(aLong);
    }


}

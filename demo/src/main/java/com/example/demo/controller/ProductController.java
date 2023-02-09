package com.example.demo.controller;

import com.example.demo.model.Category;
import com.example.demo.model.Product;
import com.example.demo.service.ICategoryService;
import com.example.demo.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*") //>> Loại bỏ bảo mật CRF , cho phép saver ngoài gateway kết nối
@RequestMapping("/products")
public class ProductController {
    @Autowired
    private IProductService service;
    @Autowired
    private ICategoryService serviceCategory;

    @GetMapping
    public ResponseEntity<?> findAll(){
        List<Product> list = service.findAll();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findOne(@PathVariable Long id){
        Optional<Product> product = service.findById(id);
        if(product.isPresent()){
            return new ResponseEntity<>(product.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_GATEWAY);
    }

    @PostMapping
    public ResponseEntity<?> add(@RequestBody Product product){
        product.setId(null);
        Product products = service.save(product);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<?> update(@RequestBody Product product){
        if(service.findById(product.getId()).isPresent()){
            Product products = service.save(product);
            return new ResponseEntity<>(products, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_GATEWAY);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        if(service.findById(id).isPresent()){
            service.deleteById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_GATEWAY);
    }

    @GetMapping("/categorys")
    public ResponseEntity<?> findAllCategory(){
        List<Category> list = serviceCategory.findAll();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }


}

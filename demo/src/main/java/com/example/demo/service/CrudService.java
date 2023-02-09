package com.example.demo.service;

import java.util.List;
import java.util.Optional;

public interface CrudService <E, ID> {
    Optional<E> findById(ID id);
    List<E> findAll();
    E save(E e);
    void deleteById(ID id);
}

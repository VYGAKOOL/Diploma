package org.springframework.samples.petclinic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.samples.petclinic.model.Vet;

public interface VetRepository extends JpaRepository<Vet, Integer> {
}

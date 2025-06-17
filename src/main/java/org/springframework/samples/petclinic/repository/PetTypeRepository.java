package org.springframework.samples.petclinic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.samples.petclinic.model.PetType;

public interface PetTypeRepository extends JpaRepository<PetType, Integer> {
}

package org.springframework.samples.petclinic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.samples.petclinic.model.Visit;
import java.util.Collection;

public interface VisitRepository extends JpaRepository<Visit, Integer> {
    Collection<Visit> findByPetId(Integer petId);
}

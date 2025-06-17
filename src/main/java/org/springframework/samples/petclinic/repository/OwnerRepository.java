package org.springframework.samples.petclinic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.samples.petclinic.model.Owner;
import java.util.Collection;

public interface OwnerRepository extends JpaRepository<Owner, Integer> {
    Collection<Owner> findByLastName(String lastName);
}

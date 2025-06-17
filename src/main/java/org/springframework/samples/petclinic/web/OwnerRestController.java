package org.springframework.samples.petclinic.web;

import org.springframework.web.bind.annotation.*;
import org.springframework.samples.petclinic.model.Owner;
import org.springframework.samples.petclinic.model.Pet;
import org.springframework.samples.petclinic.model.Visit;
import org.springframework.samples.petclinic.repository.OwnerRepository;
import org.springframework.samples.petclinic.repository.VisitRepository;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;


@RestController
@RequestMapping("/api/owners")
public class OwnerRestController {

    private final OwnerRepository owners;
    private final VisitRepository visits;

    public OwnerRestController(OwnerRepository owners, VisitRepository visits) {
        this.owners = owners;
        this.visits = visits;
    }

    @GetMapping
    public Collection<Owner> findOwners(@RequestParam(value = "lastName", required = false) String lastName) {
        if (lastName == null || lastName.isEmpty()) {
            return this.owners.findAll();
        }
        return this.owners.findByLastName(lastName);
    }

    @GetMapping("/{ownerId}")
    public Owner getOwner(@PathVariable("ownerId") Integer ownerId) {
        Owner owner = this.owners.findById(ownerId).orElse(null);
        if (owner != null) {
            owner.getPets().forEach(pet -> {
                // перетворюємо Collection<Visit> у Set<Visit>
                Collection<Visit> visitsForPet = visits.findByPetId(pet.getId());
                pet.setVisits(new HashSet<>(visitsForPet));
            });
        }
        return owner;
    }


    @PostMapping
    public Owner createOwner(@RequestBody Owner owner) {
        this.owners.save(owner);
        return owner;
    }


    @PutMapping("/{ownerId}")
    public Owner updateOwner(@PathVariable("ownerId") Integer ownerId,
                             @RequestBody Owner updatedOwner) {
        return this.owners.findById(ownerId)
                .map(owner -> {
                    owner.setFirstName(updatedOwner.getFirstName());
                    owner.setLastName(updatedOwner.getLastName());
                    owner.setAddress(updatedOwner.getAddress());
                    owner.setCity(updatedOwner.getCity());
                    owner.setTelephone(updatedOwner.getTelephone());
                    this.owners.save(owner);
                    return owner;
                })
                .orElse(null);
    }


    @DeleteMapping("/{ownerId}")
    public void deleteOwner(@PathVariable("ownerId") Integer ownerId) {
        this.owners.deleteById(ownerId);
    }
}

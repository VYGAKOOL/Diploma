package org.springframework.samples.petclinic.web;

import org.springframework.web.bind.annotation.*;
import org.springframework.samples.petclinic.model.Owner;
import org.springframework.samples.petclinic.model.Pet;
import org.springframework.samples.petclinic.repository.OwnerRepository;
import org.springframework.samples.petclinic.repository.PetRepository;

import java.util.Collection;

/**
 * REST API для домашніх тварин (Pets) власника.
 * Базовий шлях: /api/owners/{ownerId}/pets
 */
@RestController
@RequestMapping("/api/owners/{ownerId}/pets")
public class PetRestController {

    private final PetRepository pets;
    private final OwnerRepository owners;

    public PetRestController(PetRepository pets, OwnerRepository owners) {
        this.pets = pets;
        this.owners = owners;
    }


    @GetMapping
    public Collection<Pet> listPets(@PathVariable("ownerId") Integer ownerId) {
        Owner owner = this.owners.findById(ownerId).orElse(null);
        return (owner != null) ? owner.getPets() : null;
    }


    @PostMapping
    public Pet createPet(@PathVariable("ownerId") Integer ownerId,
                         @RequestBody Pet pet) {
        return this.owners.findById(ownerId)
                .map(owner -> {
                    owner.addPet(pet);
                    this.pets.save(pet);
                    return pet;
                })
                .orElse(null);
    }


    @PutMapping("/{petId}")
    public Pet updatePet(@PathVariable("ownerId") Integer ownerId,
                         @PathVariable("petId") Integer petId,
                         @RequestBody Pet updatedPet) {
        return this.pets.findById(petId)
                .map(pet -> {
                    pet.setName(updatedPet.getName());
                    pet.setBirthDate(updatedPet.getBirthDate());
                    pet.setType(updatedPet.getType());
                    this.pets.save(pet);
                    return pet;
                })
                .orElse(null);
    }


    @DeleteMapping("/{petId}")
    public void deletePet(@PathVariable("ownerId") Integer ownerId,
                          @PathVariable("petId") Integer petId) {
        this.pets.deleteById(petId);
    }
}

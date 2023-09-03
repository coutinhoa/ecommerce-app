package warehouse.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.Hibernate;

import java.util.List;
import java.util.Objects;

import static jakarta.persistence.GenerationType.IDENTITY;

@Getter
@Setter
@RequiredArgsConstructor
@ToString
@NoArgsConstructor
@Entity
@Table(name = "sizes")

public class Size {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    @Column(name = "sizes", nullable = false)
    @NonNull
    private String size;

    @OneToMany(mappedBy = "size")
    @JsonIgnore
    private List<GarmentSize> garmentSizes;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Size size = (Size) o;
        return getId() != null && Objects.equals(getId(), size.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}



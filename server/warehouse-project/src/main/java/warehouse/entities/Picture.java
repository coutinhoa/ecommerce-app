package warehouse.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.Hibernate;
import org.springframework.stereotype.Component;

import java.util.Objects;

import static jakarta.persistence.GenerationType.IDENTITY;

@Getter
@Setter
@RequiredArgsConstructor
@ToString
@NoArgsConstructor
@Entity
@Component
@Table(name = "pictures")
public class Picture {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    @Column(name = "url", nullable = false)
    @NonNull
    private String url;

    @ManyToOne
    @JoinColumn(name = "garment_id", nullable = false, referencedColumnName = "id")
    @JsonIgnore
    private WarehouseProduct garment;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Picture picture = (Picture) o;
        return getId() != null && Objects.equals(getId(), picture.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}

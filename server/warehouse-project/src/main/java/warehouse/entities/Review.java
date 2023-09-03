package warehouse.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.stereotype.Component;

import static jakarta.persistence.GenerationType.IDENTITY;

@Getter
@Setter
@RequiredArgsConstructor
@ToString
@NoArgsConstructor
@Entity
@Component
@Table(name = "reviews")
public class Review {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    @Column(name = "rating", nullable = false)
    private int rating;

    @Column(name = "description", nullable = false)
    @NonNull
    private String description;

    @Column(name = "date", nullable = false)
    @NonNull
    private String date;

    @ManyToOne
    @JoinColumn(name = "garment_id", nullable = false, referencedColumnName = "id")
    @JsonIgnore
    private WarehouseProduct garment;

    public WarehouseProduct getGarment() {
        return garment;
    }

    public void setGarment(WarehouseProduct warehouseProduct) {
    }
}
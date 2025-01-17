"use client";
import { useUser } from "@/components/getUserData";
import { Badge, Button, Card, Heading, Input, Skeleton } from "@chakra-ui/react";
import React from "react";
import { Field } from "@/components/ui/field";
import API from "@/services/API";
import { IReviewResponse } from "@/models/IReview";
import { Rating } from "@/components/ui/rating";
import { title } from "process";
import { LuAnnoyed } from "react-icons/lu";
import { Form } from "react-router-dom";
import { EmptyState } from "@/components/ui/empty-state";
import { DataListItem, DataListRoot } from "@/components/ui/data-list";

export default function Page() {
  const { accessToken, user } = useUser();

  const [reviews, setReviews] = React.useState<IReviewResponse[]>();

  React.useEffect(() => {
    if (accessToken && user) {
      API.getReviews(accessToken)
        .then(reviews => {
          const userReviews: IReviewResponse[] = reviews.filter(review => review.reviewee === user.id);
          setReviews(userReviews);
        });
    }
  }, []);

  return (
    <div>
      <Heading>My reviews</Heading>
      {
        !reviews ?
          <Skeleton height={100} />
          :
          reviews.length === 0 ?
            <EmptyState
              icon={<LuAnnoyed />}
              title="No reviews"
              description="Don't worry, don't feel underestimated..."
            />
            :
            reviews.map(({ comment, reviewer, listing, rating }) => (
              <Card.Root variant={'elevated'}>
                <Card.Body>
                  <Card.Title>{title}</Card.Title>
                  <DataListRoot>
                    <DataListItem key='reviewer' label='Reviewer id' value={reviewer} />
                    <DataListItem key='listing' label='Listing id' value={listing} />
                    <DataListItem key='comment' label='Comment' value={comment} />
                  </DataListRoot>
                  <Rating value={rating} disabled />
                </Card.Body>
              </Card.Root>
            ))
      }
    </div>
  )
}

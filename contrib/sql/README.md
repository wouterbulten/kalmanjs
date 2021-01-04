
# SQL Adaptation of KalmanFilter

Authors:

- @trademark18 at @archetypesc


## Example Usage


This is a stored procedure that is invoked with 3 parameters:

1. State Identifier `VARCHAR(32)` -- Unique identifier to be used when referencing this filter. A new filter is created if no existing one matches this identifier.
2. "x" value -- the value to be fed into the filter.
3. Prediction (output parameter) -- The filter's prediction will be returned in this value.
  

        -- Example 1

        DECLARE @prediction FLOAT;

        EXEC sp_kalman 'stateIdentifier', 27, @prediction OUTPUT

        SELECT @prediction;

        

        -- Example 2 (more realistic values)

        DECLARE @predictedLatitude FLOAT;

        EXEC sp_kalman 'abcd3fa3b2-lat', 32.7444589, @predictedLatitude OUTPUT

        SELECT @predictedLatitude;
  

## Caveats

- Unlike the other platforms to which Kalman.JS has been translated, SQL isn't stateful. That's why we have to persist state to a DB table.  The table is called KalmanState.

- If you like, you can create the table yourself, but if you just create the SPROC it will attempt to create the table if it can't find it. If it doesn't have permission or it is otherwise unable to create the KalmanState table, it will throw an error and print out a `CREATE TABLE` script for you to run.

- You can't `EXEC` this inside a transaction that has `SNAPSHOT ISOLATION` enabled, because operations that modify data are incompatible with `SNAPSHOT` and this must modify data in order to update state.

- This doesn't have any mechanism whereby it will delete the state of filters that are no longer needed. You'll need to have your app clean up with something like `DELETE FROM KalmanState WHERE identifier = 'something'`


## Advice

- If you don't have a strong reason for which you want to do this in the DB layer, consider using Kalman.JS or another API-level alternative. This is for cases where doing Kalman in the database is necessary.


## Improvements
I found this difficult to bolt into my existing query.  I'd love to find a solution that can be joined to or operate more like a function.  If you have ideas on how to accomplish that, bring them on!